import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAINTENANCE_MODE = false;

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!MAINTENANCE_MODE) {
        return NextResponse.next();
    }

    // Let the maintenance page and framework assets load.
    if (
        pathname === "/maintenance" ||
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/api/") ||
        pathname === "/favicon.ico" ||
        pathname === "/robots.txt" ||
        pathname === "/sitemap.xml"
    ) {
        return NextResponse.next();
    }

    // Temporarily send public pages to the maintenance page.
    return NextResponse.redirect(
        new URL("/maintenance", request.url),
        307
    );
}

export const config = {
    matcher: ["/:path*"],
};