import { cookies } from "next/headers";

export type Locale = "en" | "es-ve";

export const getLocale = (): Locale => {
  const value = cookies().get("qcs_locale")?.value;
  if (value === "es" || value === "es-ve") return "es-ve";
  return "en";
};
