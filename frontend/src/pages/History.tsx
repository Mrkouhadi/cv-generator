import { useTranslation } from "react-i18next";
import Education from "../components/forms/Education";
import Experience from "../components/forms/Experience";
import Language from "../components/forms/Language";
import Skill from "../components/forms/Skill";

const History = () => {
  const { t, i18n } = useTranslation("global");

  return (
    <div className="text-dark dark:text-white h-screen p-4">
      {t("sidebar.history")}
      <Education />
      <Experience />
      <Skill />
      <Language />
    </div>
  );
};

export default History;
