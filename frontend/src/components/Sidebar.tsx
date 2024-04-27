import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";
import LanguageToggler from "./LanguageToggler";

const Sidebar = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <aside className="bg-bg-light-2 dark:bg-bg-dark-2 h-screen w-36 flex flex-col items-center justify-between gap-4">
      <div className="bg-primary w-full h-16 flex items-center justify-center">
        <h1 className="text-font-dark-1">CV Builder</h1>
      </div>
      <nav className="flex flex-col items-center gap-4 flex-1 text-font-dark-2 dark:text-font-light-2">
        <Link to="/">
          <p className="text-font-light-1 dark:text-font-dark-1 hover:text-primary hover:dark:text-primary">
            {t("sidebar.dashboard")}
          </p>
        </Link>
        <Link to="/setting">
          <p className="text-font-light-1 dark:text-font-dark-1 hover:text-primary hover:dark:text-primary">
            {t("sidebar.setting")}
          </p>
        </Link>
        <Link to="/history">
          <p className="text-font-light-1 dark:text-font-dark-1 hover:text-primary hover:dark:text-primary">
            {t("sidebar.history")}
          </p>
        </Link>
      </nav>
      <LanguageToggler />
      <DarkMode />
    </aside>
  );
};
export default Sidebar;
