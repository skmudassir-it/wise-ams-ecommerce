import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
  
  // Redirect to login if accessing protected page while not logged in
  if (!isLoggedIn && !isAuthPage && req.nextUrl.pathname.startsWith("/cart")) {
    return NextResponse.redirect(new URL("/login?callbackUrl=" + encodeURIComponent(req.nextUrl.pathname), req.url));
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ["/cart", "/login", "/register"],
};
