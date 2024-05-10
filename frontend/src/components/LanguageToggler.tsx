import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageToggler: React.FC = () => {
  const { t, i18n } = useTranslation("global");
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const changeLanguageHandler = (lng: string) => {
    i18n.changeLanguage(lng);
    setActiveLanguage(lng);
    localStorage.setItem("language", lng);
    setOpen(false);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
    setActiveLanguage(savedLanguage);
  }, []);

  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-around items-center gap-3"
      >
        <button className="text-font-light-1 dark:text-font-dark-1 cursor-pointer">
          {t("language." + activeLanguage)}{" "}
        </button>
        <GlobeEuropeAfricaIcon className="size-6 text-font-light-1 dark:text-font-dark-1 cursor-pointer" />
      </div>

      <div
        className={` z-50 min-w-24 bg-primary flex flex-col gap-2 absolute p-4 -bottom-72 left-36 transition-transform ${
          open ? "bottom-0 translate-y-0 " : "translate-y-full "
        }`}
      >
        <button
          onClick={() => changeLanguageHandler("en")}
          className="text-font-dark-1  hover:text-yellow-400"
        >
          {t("language.en")}
        </button>
        <button
          onClick={() => changeLanguageHandler("de")}
          className="text-font-dark-1  hover:text-yellow-400"
        >
          {t("language.de")}
        </button>
        <button
          onClick={() => changeLanguageHandler("zh")}
          className="text-font-dark-1  hover:text-yellow-400"
        >
          {t("language.zh")}
        </button>
        <button
          onClick={() => changeLanguageHandler("fr")}
          className="text-font-dark-1  hover:text-yellow-400"
        >
          {t("language.fr")}
        </button>
      </div>
    </div>
  );
};

export default LanguageToggler;
