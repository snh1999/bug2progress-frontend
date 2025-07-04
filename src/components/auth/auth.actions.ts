"use server";

import { AUTH_TOKEN_KEY } from "@/app.constants";
import { cookies } from "next/headers";

export async function setAuthCookie(token: string) {
  (await cookies()).set({
    name: AUTH_TOKEN_KEY,
    value: token,
    // httpOnly: true,
    // path: "/",
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "strict",
    // maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getBearerToken() {
  return `Bearer ${(await cookies()).get(AUTH_TOKEN_KEY)?.value ?? ""}`;
}
