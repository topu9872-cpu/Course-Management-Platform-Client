import { NextResponse } from "next/server";
import { userDet } from "./lib/user";

export async function proxy(request:any ) {
  const { pathname} = request.nextUrl
const user=await userDet()

if (!user) {
        const loginUrl = new URL("/login", request.url)
        loginUrl.searchParams.set("redirect",pathname)
        return NextResponse.redirect(loginUrl)
    }
  return NextResponse.next();
     
}
export const config = {
  matcher:"/dashboard/:path*",
};