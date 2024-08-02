import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
//   const session = !!req.cookies.get("access_token");
//   const refresh = !!req.cookies.get("refresh_token");

//   if (!session || !refresh) {
//     return NextResponse.redirect(new URL(`/`, req.url));
//   }
//   return NextResponse.next();
// 
}

export const config = {
  matcher: ["/profile/:path*", "/profile/enrolled-courses", "/profile/change-password"],
};
