import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const DarkMode = () => {
  const [t, i18n] = useTranslation("global");
  const [theme, setTheme] = useState<string>("");

  // dark mode switcher
  const handleThemeSwitch = (th: string) => {
    setTheme(th);
    localStorage.setItem("theme", th);
  };
  useEffect(() => {
    if (localStorage.getItem("theme") == null) {
      if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
        setTheme("dark");
        localStorage.setItem("theme", "dark");
      } else {
        setTheme("light");
        localStorage.setItem("theme", "light");
      }
    } else {
      localStorage.getItem("theme");
      setTheme(localStorage.getItem("theme")!);
    }
  }, []);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <div className="m-1 p-1 bg-bg-dark-1 shadow rounded-full flex items-center justify-center text-sm">
      <p
        onClick={() => handleThemeSwitch("dark")}
        className={`${
          theme === "dark" && "bg-bg-dark-2 text-font-dark-1"
        } h-8 w-16 flex items-center justify-center rounded-full cursor-pointer text-font-dark-1 transition-colors`}
      >
        <MoonIcon className="size-6 text-font-dark-1" />
      </p>
      <p
        onClick={() => handleThemeSwitch("light")}
        className={`${
          theme === "light" && "bg-bg-light-1 text-font-light-1"
        } h-8 w-16 flex items-center justify-center rounded-full cursor-pointer text-font-dark-1 transition-colors`}
      >
        <SunIcon className="size-6 text-font-light-1 dark:text-font-dark-1 " />
      </p>
    </div>
  );
};

export default DarkMode;
