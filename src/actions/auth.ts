"use server";

import { cookies } from "next/headers";

export interface SessionUser {
  name: string;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
}

const SESSION_COOKIE_NAME = "sai-sneh-auth-session";

export async function loginAction(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (email === "admin@saisneh.com" && password === "admin123") {
      const user: SessionUser = {
        name: "Hospital Administrator",
        email: "admin@saisneh.com",
        role: "ADMIN"
      };

      const sessionValue = Buffer.from(JSON.stringify(user)).toString("base64");
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, sessionValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 // 1 day
      });

      return { success: true };
    }

    if (email === "snehal@saisneh.com" && password === "doctor123") {
      const user: SessionUser = {
        name: "Dr. Snehal Jagtap",
        email: "snehal@saisneh.com",
        role: "DOCTOR"
      };

      const sessionValue = Buffer.from(JSON.stringify(user)).toString("base64");
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, sessionValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 // 1 day
      });

      return { success: true };
    }

    return { success: false, error: "Invalid credentials. Use admin@saisneh.com / admin123" };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to authenticate." };
  }
}

export async function logoutAction(): Promise<boolean> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return true;
}
