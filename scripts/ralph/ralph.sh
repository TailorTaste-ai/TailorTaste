#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'USAGE'
Usage: ./scripts/ralph/ralph.sh [max_iterations]

Options:
  --model <name>        Codex model override (optional)
  --no-full-auto        Do not pass --full-auto to codex exec
  --sandbox <mode>      Codex sandbox mode (default: workspace-write)
  -h, --help            Show help

Environment overrides:
  PRD_FILE              Path to PRD JSON (default: ./prd.json)
  PROGRESS_FILE         Path to progress log (default: ./progress.txt)
  PROMPT_FILE           Base prompt template (default: ./scripts/ralph/CODEX.md)
  QUALITY_CHECK_CMD     Command run after each iteration (default: npm run check)
USAGE
}

MAX_ITERATIONS="10"
CODEX_MODEL=""
USE_FULL_AUTO="true"
CODEX_SANDBOX="workspace-write"

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      usage
      exit 0
      ;;
    --model)
      [[ $# -ge 2 ]] || { echo "Missing value for --model" >&2; exit 1; }
      CODEX_MODEL="$2"
      shift 2
      ;;
    --no-full-auto)
      USE_FULL_AUTO="false"
      shift
      ;;
    --sandbox)
      [[ $# -ge 2 ]] || { echo "Missing value for --sandbox" >&2; exit 1; }
      CODEX_SANDBOX="$2"
      shift 2
      ;;
    ''|*[!0-9]*)
      echo "Unknown argument: $1" >&2
      usage
      exit 1
      ;;
    *)
      MAX_ITERATIONS="$1"
      shift
      ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
PRD_FILE="${PRD_FILE:-${PROJECT_ROOT}/prd.json}"
PROGRESS_FILE="${PROGRESS_FILE:-${PROJECT_ROOT}/progress.txt}"
PROMPT_FILE="${PROMPT_FILE:-${SCRIPT_DIR}/CODEX.md}"
QUALITY_CHECK_CMD="${QUALITY_CHECK_CMD:-npm run check}"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_cmd jq
require_cmd git
require_cmd codex

if [[ ! -f "$PRD_FILE" ]]; then
  echo "Missing PRD file: $PRD_FILE" >&2
  exit 1
fi

if [[ ! -f "$PROMPT_FILE" ]]; then
  echo "Missing prompt template: $PROMPT_FILE" >&2
  exit 1
fi

mkdir -p "$(dirname "$PROGRESS_FILE")"
touch "$PROGRESS_FILE"

BRANCH_NAME="$(jq -r '.branchName // empty' "$PRD_FILE")"
if [[ -z "$BRANCH_NAME" ]]; then
  BRANCH_NAME="ralph/$(date +%Y%m%d-%H%M%S)"
  echo "No branchName in PRD; using: $BRANCH_NAME"
fi

CURRENT_BRANCH="$(git -C "$PROJECT_ROOT" rev-parse --abbrev-ref HEAD)"
if [[ "$CURRENT_BRANCH" != "$BRANCH_NAME" ]]; then
  if git -C "$PROJECT_ROOT" show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
    git -C "$PROJECT_ROOT" checkout "$BRANCH_NAME"
  else
    git -C "$PROJECT_ROOT" checkout -b "$BRANCH_NAME"
  fi
fi

append_progress() {
  local message="$1"
  {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $message"
  } >> "$PROGRESS_FILE"
}

mark_story_passed() {
  local story_index="$1"
  local tmp
  tmp="$(mktemp)"
  jq ".userStories[$story_index].passes = true" "$PRD_FILE" > "$tmp"
  mv "$tmp" "$PRD_FILE"
}

pick_next_story_index() {
  jq -r '.userStories | to_entries | map(select(.value.passes != true)) | .[0].key // empty' "$PRD_FILE"
}

build_prompt_file() {
  local out_file="$1"
  local story_json="$2"
  local story_id story_title story_criteria
  story_id="$(jq -r '.id // "unknown"' <<<"$story_json")"
  story_title="$(jq -r '.title // "Untitled story"' <<<"$story_json")"
  story_criteria="$(jq -r '[.acceptanceCriteria[]?] | if length == 0 then "(none provided)" else join("\n- ") end' <<<"$story_json")"

  {
    cat "$PROMPT_FILE"
    echo
    echo "---"
    echo "Current Story"
    echo "id: $story_id"
    echo "title: $story_title"
    echo "acceptanceCriteria:"
    if [[ "$story_criteria" == "(none provided)" ]]; then
      echo "- (none provided)"
    else
      echo "- $story_criteria"
    fi
    echo
    echo "Quality check command: $QUALITY_CHECK_CMD"
    echo
    echo "Recent progress context (last 40 lines):"
    tail -n 40 "$PROGRESS_FILE" 2>/dev/null || true
    echo
    echo "Important constraints:"
    echo "- Implement only this one story in this iteration."
    echo "- Run relevant tests/checks needed for confidence in your change."
    echo "- Keep commits small and focused."
    echo "- If blocked, explain exactly what blocked you and what to do next."
  } > "$out_file"
}

run_codex_iteration() {
  local prompt_tmp="$1"
  local -a cmd
  cmd=(codex exec -C "$PROJECT_ROOT" --sandbox "$CODEX_SANDBOX")

  if [[ "$USE_FULL_AUTO" == "true" ]]; then
    cmd+=(--full-auto)
  fi

  if [[ -n "$CODEX_MODEL" ]]; then
    cmd+=(--model "$CODEX_MODEL")
  fi

  "${cmd[@]}" - < "$prompt_tmp"
}

all_done() {
  jq -e 'all(.userStories[]?; .passes == true)' "$PRD_FILE" >/dev/null
}

for ((i=1; i<=MAX_ITERATIONS; i++)); do
  if all_done; then
    echo "<promise>COMPLETE</promise>"
    exit 0
  fi

  story_index="$(pick_next_story_index)"
  if [[ -z "$story_index" ]]; then
    echo "No incomplete stories found."
    echo "<promise>COMPLETE</promise>"
    exit 0
  fi

  story_json="$(jq -c ".userStories[$story_index]" "$PRD_FILE")"
  story_id="$(jq -r '.id // "unknown"' <<<"$story_json")"
  story_title="$(jq -r '.title // "Untitled story"' <<<"$story_json")"

  echo
  echo "[$i/$MAX_ITERATIONS] Story $story_id: $story_title"
  append_progress "Starting iteration $i for story $story_id: $story_title"

  prompt_tmp="$(mktemp)"
  build_prompt_file "$prompt_tmp" "$story_json"

  set +e
  run_codex_iteration "$prompt_tmp"
  codex_exit=$?
  set -e
  rm -f "$prompt_tmp"

  if [[ $codex_exit -ne 0 ]]; then
    echo "Codex exited with status $codex_exit; keeping story open."
    append_progress "Iteration $i failed: codex exit status $codex_exit on story $story_id"
    continue
  fi

  set +e
  (cd "$PROJECT_ROOT" && bash -lc "$QUALITY_CHECK_CMD")
  check_exit=$?
  set -e

  if [[ $check_exit -ne 0 ]]; then
    echo "Quality checks failed (exit $check_exit); keeping story open."
    append_progress "Iteration $i failed quality checks (exit $check_exit) for story $story_id"
    continue
  fi

  git -C "$PROJECT_ROOT" add -A
  if git -C "$PROJECT_ROOT" diff --cached --quiet; then
    append_progress "Iteration $i passed checks but produced no file changes for story $story_id"
    echo "No staged changes to commit for story $story_id."
  else
    git -C "$PROJECT_ROOT" commit -m "ralph: story $story_id - $story_title"
    append_progress "Committed iteration $i for story $story_id"
  fi

  mark_story_passed "$story_index"
  append_progress "Marked story $story_id as passes=true"
done

echo "Reached max iterations ($MAX_ITERATIONS) before completing all stories."
exit 0
