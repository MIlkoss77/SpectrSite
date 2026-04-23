import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { eq } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { localUsers } from "@db/schema";
import type { LocalUser } from "@db/schema";
import { env } from "./lib/env";

const secret = new TextEncoder().encode(env.appSecret || "spectr-local-auth-secret");

async function createToken(userId: number): Promise<string> {
  return new SignJWT({ sub: String(userId), type: "local" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}

export async function verifyLocalAuth(headers: Headers): Promise<LocalUser | null> {
  const token = headers.get("x-local-auth-token");
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret, { clockTolerance: 60 });
    const userId = Number(payload.sub);
    if (!userId) return null;

    const db = getDb();
    const rows = await db.select().from(localUsers).where(eq(localUsers.id, userId)).limit(1);
    return rows[0] || null;
  } catch {
    return null;
  }
}

export const localAuthRouter = createRouter({
  register: publicQuery
    .input(
      z.object({
        username: z.string().min(3).max(50),
        displayName: z.string().max(255).optional(),
        email: z.string().email().optional(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      const existing = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.username, input.username))
        .limit(1);

      if (existing.length > 0) {
        throw new Error("Username already taken");
      }

      const passwordHash = await bcrypt.hash(input.password, 12);

      const result = await db.insert(localUsers).values({
        username: input.username,
        displayName: input.displayName || input.username,
        email: input.email || null,
        passwordHash,
      });

      const userId = Number(result[0].insertId);
      const token = await createToken(userId);

      return { success: true, token };
    }),

  login: publicQuery
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      const rows = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.username, input.username))
        .limit(1);

      const user = rows[0];
      if (!user) {
        throw new Error("Invalid username or password");
      }

      const valid = await bcrypt.compare(input.password, user.passwordHash);
      if (!valid) {
        throw new Error("Invalid username or password");
      }

      const token = await createToken(user.id);

      return {
        success: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          name: user.displayName || user.username,
          role: user.role,
        },
      };
    }),

  me: publicQuery.query(async ({ ctx }) => {
    const token = ctx.req.headers.get("x-local-auth-token");
    if (!token) return null;

    try {
      const { payload } = await jwtVerify(token, secret, { clockTolerance: 60 });
      const userId = Number(payload.sub);
      if (!userId) return null;

      const db = getDb();
      const rows = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.id, userId))
        .limit(1);

      const user = rows[0];
      if (!user) return null;

      return {
        id: user.id,
        username: user.username,
        name: user.displayName || user.username,
        displayName: user.displayName,
        email: user.email,
        role: user.role,
      };
    } catch {
      return null;
    }
  }),
});
