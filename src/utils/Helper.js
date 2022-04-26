import i18n from "i18next";

export default class Helper {
  static setDefaultLanguage(language) {
    return new Promise((resolve) => {
      i18n.changeLanguage(language).then(() => {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("lang", language);
          resolve("ok");
        }
      });
    });
  }
}
