import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");

      if (isOnLoginPage)
        return isLoggedIn ? Response.redirect(new URL("/", nextUrl)) : true;

      return isLoggedIn;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
