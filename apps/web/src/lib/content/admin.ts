import { cookies, headers } from "next/headers";

const adminToken = process.env.EDITORIAL_ADMIN_TOKEN;

export type EditorialAccess =
  | {
      allowed: true;
      mode: "configured" | "development";
      message?: string;
    }
  | {
      allowed: false;
      mode: "configured";
      message: string;
    };

export async function getEditorialAccess(): Promise<EditorialAccess> {
  if (!adminToken) {
    return {
      allowed: true,
      mode: "development",
      message:
        "EDITORIAL_ADMIN_TOKEN is not configured; editorial access is open in this local environment.",
    };
  }

  const cookieStore = await cookies();
  const headerStore = await headers();
  const suppliedToken =
    cookieStore.get("editorial_admin_token")?.value ??
    headerStore.get("x-editorial-admin-token");

  if (suppliedToken === adminToken) {
    return { allowed: true, mode: "configured" };
  }

  return {
    allowed: false,
    mode: "configured",
    message: "Editorial access requires an admin session.",
  };
}

export async function assertEditorialAdmin() {
  const access = await getEditorialAccess();

  if (!access.allowed) {
    throw new Error(access.message);
  }

  return access;
}
