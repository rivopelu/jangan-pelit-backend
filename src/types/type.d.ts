import "hono";
import i18next from "i18next";
import en from "./locales/en.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof en;
    };
  }
}

declare module "hono" {
  interface ContextVariableMap {
    t: typeof i18next.t;
  }
}
