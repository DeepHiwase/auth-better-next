"use server";

import { auth } from "@/lib/auth"; // this auth instance meant to be run on server not on client -> on clinet - auth-client
import { parseSetCookieHeader } from "better-auth/cookies";
import { cookies, headers } from "next/headers";

export async function signInEmailAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter your email" };

  const password = String(formData.get("password"));
  if (!password) return { error: "Please enter your password" };

  try {
    const res = await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
      asResponse: true, // to attch more to response obj
    });

    // ===
    const setCookieHeader = res.headers.get("set-cookie");
    console.log(setCookieHeader);
    if (setCookieHeader) {
      const cookie = parseSetCookieHeader(setCookieHeader);
      console.log(cookie);
      const cookieStore = await cookies();
      console.log(cookieStore);

      const [key, cookieAttributes] = [...cookie.entries()][0];
      console.log({ key, cookieAttributes });
      const value = cookieAttributes.value;
      const maxAge = cookieAttributes["max-age"];
      const path = cookieAttributes.path;
      const httpOnly = cookieAttributes.httponly;
      const sameSite = cookieAttributes.samesite;
      console.log({ value, maxAge, path, httpOnly, sameSite });

      cookieStore.set(key, decodeURIComponent(value), {
        maxAge,
        path,
        httpOnly,
        sameSite,
      });
    }
    // ====

    return { error: null };
  } catch (err) {
    if (err instanceof Error) {
      return { error: "Opps! Something went wrong while logging IN" };
    } else {
      return { error: "Internal Server Error!" };
    }
  }
}
