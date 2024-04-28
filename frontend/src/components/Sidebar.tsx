import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import DarkMode from "./DarkMode";
import LanguageToggler from "./LanguageToggler";
import logo from "../assets/images/appicon.png";

const Sidebar = () => {
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
  }, []);

  return (
    <aside className="bg-bg-light-2 dark:bg-bg-dark-2 h-screen w-36 flex flex-col items-center justify-between gap-4">
      <div className="h-16 w-full flex items-center justify-center shadow dark:shadow-bg-dark-1">
        <img src={logo} className="h-24" />
      </div>
      <nav className="mt-8 flex flex-col items-center gap-4 flex-1 text-font-dark-2 dark:text-font-light-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary hover:dark:text-primary"
              : "text-font-light-1 dark:text-font-dark-1 hover:text-primary hover:dark:text-primary"
          }
        >
          {t("sidebar.dashboard")}
        </NavLink>

        <NavLink
          to="/setting"
          className={({ isActive }) =>
            isActive
              ? "text-primary hover:dark:text-primary"
              : "text-font-light-1 dark:text-font-dark-1 hover:text-primary hover:dark:text-primary"
          }
        >
          {t("sidebar.setting")}
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive
              ? "text-primary hover:dark:text-primary"
              : "text-font-light-1 dark:text-font-dark-1 hover:text-primary hover:dark:text-primary"
          }
        >
          {t("sidebar.history")}
        </NavLink>
      </nav>
      <LanguageToggler />
      <DarkMode />
    </aside>
  );
};
export default Sidebar;
