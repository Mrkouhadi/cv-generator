import { useTranslation } from "react-i18next";
import Canadian1 from "../components/templates/Canadian1";

const Templates = () => {
  const { t } = useTranslation("global");

  return (
    <div className="min-h-screen p-4">
      <h1>{t("sidebar.templates")}</h1>
      <Canadian1 />
    </div>
  );
};

export default Templates;
