import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import prisma from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { getValidDomains, normalizeName } from "@/lib/utils";

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
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        // console.log("We are here");
        const email = String(ctx.body.email); // twicking to body object can be done here before actiual logic in better auth/ normal
        const domain = email.split("@")[1];

        const VALID_DOMAINS = getValidDomains();
        if (!VALID_DOMAINS.includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid domain, Please use a valid email.",
          });
        }

        const name = normalizeName(ctx.body.name);
        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            },
          },
        };
      }
    }),
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

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
