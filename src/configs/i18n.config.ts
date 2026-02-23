import i18next from "i18next";
import en from "../locales/en.json";

export default async function i18nConfig() {
  await i18next.init({
    lng: "en",
    fallbackLng: "en",
    resources: {
      en: { translation: en },
    },
  });
}
