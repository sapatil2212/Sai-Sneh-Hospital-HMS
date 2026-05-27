import { cookies } from "next/headers";

export interface SessionUser {
  name: string;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
}

const SESSION_COOKIE_NAME = "sai-sneh-auth-session";

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    
    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    // Decode mock session JSON
    const decoded = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString("utf-8"));
    return decoded as SessionUser;
  } catch (error) {
    return null;
  }
}
