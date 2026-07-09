import { connection } from "next/server";
import { redirect } from "next/navigation";

import type { Locale } from "@/i18n/routing";
import { getEditorialAccess } from "@/lib/content/admin";
import { loginEditorialAdminAction } from "@/lib/content/admin-actions";

type EditorialLoginPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string; redirectTo?: string }>;
};

export const dynamic = "force-dynamic";

const labelsByLocale = {
  en: {
    title: "Editorial login",
    subtitle: "Enter the admin token to open the editorial tools.",
    token: "Admin token",
    submit: "Continue",
    invalid: "The token was not accepted.",
    open: "Editorial access is open in this local environment.",
  },
  zh: {
    title: "编辑登录",
    subtitle: "输入管理员令牌以打开编辑工具。",
    token: "管理员令牌",
    submit: "继续",
    invalid: "令牌无效。",
    open: "当前本地环境未设置编辑令牌，编辑权限已开放。",
  },
} satisfies Record<Locale, Record<string, string>>;

export default async function EditorialLoginPage({
  params,
  searchParams,
}: EditorialLoginPageProps) {
  await connection();
  const { locale } = await params;
  const { error, redirectTo } = await searchParams;
  const currentLocale = locale as Locale;
  const labels = labelsByLocale[currentLocale] ?? labelsByLocale.en;
  const target = getSafeRedirectPath(redirectTo, currentLocale);
  const access = await getEditorialAccess();

  if (access.allowed && access.mode === "configured") {
    redirect(target);
  }

  return (
    <main className="mx-auto w-full max-w-xl px-6 py-14 sm:py-20">
      <div className="border-l-4 border-apple pl-6">
        <h1 className="text-3xl font-semibold text-ink">{labels.title}</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          {access.mode === "development" ? labels.open : labels.subtitle}
        </p>
      </div>

      <form
        action={loginEditorialAdminAction}
        className="mt-8 rounded-lg border border-ink/10 bg-cream p-5"
      >
        <input name="redirectTo" type="hidden" value={target} />
        <label className="block text-sm font-semibold text-ink">
          {labels.token}
          <input
            autoComplete="current-password"
            className="mt-2 w-full rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink"
            name="token"
            required
            type="password"
          />
        </label>
        {error === "invalid" ? (
          <p className="mt-3 text-sm font-semibold text-tomato">
            {labels.invalid}
          </p>
        ) : null}
        <button
          className="mt-4 rounded-lg bg-apple px-4 py-2 text-sm font-semibold text-white"
          type="submit"
        >
          {labels.submit}
        </button>
      </form>
    </main>
  );
}

function getSafeRedirectPath(value: string | undefined, locale: Locale) {
  if (value?.startsWith(`/${locale}/editorial`)) {
    return value;
  }

  return `/${locale}/editorial`;
}
