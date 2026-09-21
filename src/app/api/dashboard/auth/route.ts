import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

const COOKIE_NAME = "adminkey";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();

  if (request.nextUrl.searchParams.get("signout") === "1") {
    cookieStore.delete(COOKIE_NAME);
    redirect("/dashboard");
  }

  const secret = process.env.ADMIN_SECRET_KEY;
  const keyParam = request.nextUrl.searchParams.get("key");
  const storedKey = cookieStore.get(COOKIE_NAME)?.value;

  if (secret && (keyParam === secret || storedKey === secret)) {
    cookieStore.set(COOKIE_NAME, secret, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    redirect("/dashboard");
  }

  redirect("/dashboard?failed=1");
}