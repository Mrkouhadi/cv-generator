import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import DarkMode from "./DarkMode";
import LanguageToggler from "./LanguageToggler";
import logo from "../assets/images/appicon.png";

const Sidebar: React.FC = () => {
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
  }, []);

  return (
    <aside className=" bg-bg-light-1 dark:bg-bg-dark-2 h-screen w-36 flex flex-col items-center justify-between gap-4">
      <Link
        to="/"
        className="h-16 w-full flex items-center justify-center shadow dark:shadow-bg-dark-1"
      >
        <img src={logo} className="h-14 w-14" />
      </Link>
      <nav className=" mt-8 px-2 flex flex-col items-start gap-4 flex-1 text-font-dark-2 dark:text-font-light-2 w-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary  w-full text-start"
              : " w-full text-start text-font-light-1 dark:text-font-dark-1 hover:text-primary hover:dark:text-primary"
          }
        >
          {t("sidebar.dashboard")}
        </NavLink>
        <NavLink
          to="/templates"
          className={({ isActive }) =>
            isActive
              ? " w-full text-start text-primary"
              : " w-full text-start text-font-light-1 dark:text-font-dark-1 hover:text-primary hover:dark:text-primary"
          }
        >
          {t("sidebar.templates")}
        </NavLink>

        <NavLink
          to="/setting"
          className={({ isActive }) =>
            isActive
              ? "text-primary w-full text-start"
              : " w-full text-start text-font-light-1 dark:text-font-dark-1 hover:text-primary hover:dark:text-primary"
          }
        >
          {t("sidebar.setting")}
        </NavLink>
      </nav>
      <LanguageToggler />
      <DarkMode />
    </aside>
  );
};
export default Sidebar;
