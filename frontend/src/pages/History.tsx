import { useTranslation } from "react-i18next";
import Education from "../components/forms/Education";
import Experience from "../components/forms/Experience";
import Language from "../components/forms/Language";
import PersonDetails from "../components/forms/PersonDetails";
import Skill from "../components/forms/Skill";

const History = () => {
  const { t, i18n } = useTranslation("global");

  return (
    <div className="min-h-screen p-4">
      {t("sidebar.history")}
      <PersonDetails />
      <Education />
      <Experience />
      <Skill />
      <Language />
    </div>
  );
};

export default History;
