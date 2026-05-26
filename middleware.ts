import { NextRequest, NextResponse } from "next/server";

const CANVAS_PASSWORD = process.env.CANVAS_PASSWORD ?? "tailortastedemo1234";

function passwordFromAuthorization(header: string | null) {
  if (!header?.startsWith("Basic ")) return null;

  try {
    const decoded = atob(header.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex < 0) return null;
    return decoded.slice(separatorIndex + 1);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/canvas")) {
    return NextResponse.next();
  }

  const password = passwordFromAuthorization(request.headers.get("authorization"));
  if (password === CANVAS_PASSWORD) {
    return NextResponse.next();
  }

  return new NextResponse("Password required for TailorTaste Menu Editor.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="TailorTaste Menu Editor", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: ["/canvas/:path*"],
};
