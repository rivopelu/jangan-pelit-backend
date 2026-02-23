import i18next from "i18next";
import en from "../locales/en.json";

export default async function i18nConfig() {
  const originalLog = console.log;
  console.log = () => {};

  await i18next.init({
    lng: "en",
    fallbackLng: "en",
    debug: false,
    resources: {
      en: { translation: en },
    },
  });

  console.log = originalLog;
}
