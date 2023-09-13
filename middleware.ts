import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
    const pathname = request.nextUrl.pathname
    const pathes = pathname.split('/')

    if (!pathes[1]) {
        return NextResponse.redirect(new URL(`/student/login`, request.url))
    }
}