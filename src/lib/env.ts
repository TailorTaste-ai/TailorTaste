type ContactEnvStatus = {
  configured: boolean;
  missingVars: string[];
};

const requiredContactVars = ["RESEND_API_KEY", "CONTACT_TO_EMAILS", "CONTACT_FROM_EMAIL"] as const;

function parseBoolean(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === "true" || normalized === "1" || normalized === "yes") {
    return true;
  }
  if (normalized === "false" || normalized === "0" || normalized === "no") {
    return false;
  }

  return undefined;
}

export function shouldAllowIndexing() {
  const override = parseBoolean(process.env.ALLOW_INDEXING);
  if (typeof override === "boolean") {
    return override;
  }

  return process.env.NODE_ENV === "production";
}

export function getContactEnvStatus(): ContactEnvStatus {
  const missingVars = requiredContactVars.filter((key) => !process.env[key]?.trim());
  return {
    configured: missingVars.length === 0,
    missingVars,
  };
}

let hasWarnedContactEnv = false;

export function warnIfContactEnvMissing() {
  const status = getContactEnvStatus();
  if (status.configured || hasWarnedContactEnv) {
    return;
  }

  hasWarnedContactEnv = true;
  console.warn(`[tailor-taste] Contact delivery is not fully configured. Missing: ${status.missingVars.join(", ")}`);
}
