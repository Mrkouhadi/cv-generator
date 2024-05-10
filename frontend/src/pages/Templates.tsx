import { useTranslation } from "react-i18next";

const Templates: React.FC = () => {
  const { t } = useTranslation("global");

  return (
    <div className="min-h-screen p-4">
      <h1>{t("sidebar.templates")}</h1>
    </div>
  );
};

export default Templates;
