import { getContext } from "hono/context-storage";

export const t = (key: string, options?: any) => {
  const c = getContext();
  const translate = c.get("t");
  return translate(key, options);
};
