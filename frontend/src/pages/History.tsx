import { useTranslation } from "react-i18next";

const History = () => {
  const { t, i18n } = useTranslation("global");

  return (
    <div className="text-dark dark:text-white h-screen p-4">
      {t("sidebar.history")}
    </div>
  );
};

export default History;
