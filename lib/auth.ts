import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import prisma from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/argon2";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false, // by default, better auth auto signed user, by disabling it, now use will be unauthorized, session cookie will be generate -> so show unauthorizedin profile page, you have login first to show profile page data even after registration
    password: {
      // custom password hasing logic instead of better auth default
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
  session: {
    // expiresIn: 15,
    expiresIn: 30 * 24 * 60 * 60,
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [nextCookies()],
});
