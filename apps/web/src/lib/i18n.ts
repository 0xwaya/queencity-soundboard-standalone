import { cookies } from "next/headers";

export type Locale = "en" | "es-ve";

export const getLocale = async (): Promise<Locale> => {
  const cookieStore = await cookies();
  const value = cookieStore.get("qcs_locale")?.value;
  if (value === "es" || value === "es-ve") return "es-ve";
  return "en";
};
