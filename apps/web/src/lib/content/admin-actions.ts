"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "editorial_admin_token";
const adminToken = process.env.EDITORIAL_ADMIN_TOKEN;

export async function loginEditorialAdminAction(formData: FormData) {
  const token = getString(formData, "token");
  const redirectTo = getSafeRedirectPath(getString(formData, "redirectTo"));

  if (!adminToken) {
    redirect(redirectTo);
  }

  if (token !== adminToken) {
    redirect(
      `${getLoginPath(redirectTo)}?error=invalid&redirectTo=${encodeURIComponent(
        redirectTo,
      )}`,
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect(redirectTo);
}

export async function logoutEditorialAdminAction(formData: FormData) {
  const redirectTo = getSafeRedirectPath(getString(formData, "redirectTo"));
  const cookieStore = await cookies();

  cookieStore.delete(cookieName);
  redirect(getLoginPath(redirectTo));
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

function getSafeRedirectPath(value: string) {
  if (value.startsWith("/en/") || value.startsWith("/zh/")) {
    return value;
  }

  return "/en/editorial";
}

function getLoginPath(redirectTo: string) {
  const locale = redirectTo.startsWith("/zh/") ? "zh" : "en";

  return `/${locale}/editorial/login`;
}
