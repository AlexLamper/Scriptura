// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // Add other protected routes as needed
};
