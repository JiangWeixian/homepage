import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// TODO: remove this middleware
export async function middleware(req: NextRequest, _ev: NextFetchEvent) {
  const { pathname } = req.nextUrl
  // currently, homepage(path `/`) is not ready
  // if (pathname === '/') {
  //   // docs: https://nextjs.org/docs/messages/middleware-relative-urls
  //   const url = req.nextUrl.clone()
  //   url.pathname = '/issues'
  //   return NextResponse.redirect(url)
  // }
  console.log(pathname)
  return NextResponse.next()
}
