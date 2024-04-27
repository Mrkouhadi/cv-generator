import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageToggler: React.FC = () => {
  const { t, i18n } = useTranslation("global");
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [formattedLang, setFormattedLang] = useState<string | null>(null);
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

  useEffect(() => {
    formatLanguage(activeLanguage);
  }, [activeLanguage]);

  const formatLanguage = (lng: string | null) => {
    switch (lng) {
      case "en":
        setFormattedLang("English");
        break;
      case "de":
        setFormattedLang("Deutsch");
        break;
      case "zh":
        setFormattedLang("中国人");
        break;
      case "fr":
        setFormattedLang("Français");
        break;
      default:
        setFormattedLang("English");
        break;
    }
  };
  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-center items-center gap-3"
      >
        <button className="text-font-light-1 dark:text-font-dark-1 cursor-pointer">
          {formattedLang}{" "}
        </button>
        <GlobeEuropeAfricaIcon className="size-6 text-font-light-1 dark:text-font-dark-1 cursor-pointer" />
      </div>
      <div
        className={`bg-primary flex flex-col gap-2 absolute p-4 -bottom-72 left-36 duration-500 transition-transform ${
          open ? "bottom-0 translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          onClick={() => changeLanguageHandler("en")}
          className="text-font-dark-1  hover:text-yellow-400"
        >
          English
        </button>
        <button
          onClick={() => changeLanguageHandler("de")}
          className="text-font-dark-1  hover:text-yellow-400"
        >
          German
        </button>
        <button
          onClick={() => changeLanguageHandler("zh")}
          className="text-font-dark-1  hover:text-yellow-400"
        >
          Chinese
        </button>
        <button
          onClick={() => changeLanguageHandler("fr")}
          className="text-font-dark-1  hover:text-yellow-400"
        >
          French
        </button>
      </div>
    </div>
  );
};

export default LanguageToggler;
