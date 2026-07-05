export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/cart", "/account/:path*"],
};
