import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
const privateRoute = ["/private", "/dashboard", "/about"];
const adminRoute = ["/dashboard"];

export async function proxy(req) {
  // pathname
  const { pathname } = req.nextUrl;

  // token get
  const token = await getToken({ req });

  // check authentication
  const isAuthenticate = Boolean(token);

  // check isUser
  const isUser = token?.role === "user";

  // check isAdmin
  const isAdmin = token?.role === "admin";

  // check isPrivate route
  const isPrivate = privateRoute.some((r) => pathname.startsWith(r));

  // check isAdmin route
  const isAdminRoute = adminRoute.some((r) => pathname.startsWith(r));

  console.log({
    token,
    pathname,
    isAuthenticate,
    isPrivate,
    isAdminRoute,
    isAdmin,
    url: req.url,
  });

  // authentication login and redirect login page
  if (!isAuthenticate && isPrivate) {
    const redirect = new URL("/login", req.url);
    redirect.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(redirect);
  }

  // if the isn't a admin then redirect forbidden page
  if (isAuthenticate && isAdminRoute && !isAdmin) {
    return NextResponse.rewrite(new URL("/forbidden", req.url));
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ["/private/:path*", "/dashboard/:path*", "/about/:path*"],
};
