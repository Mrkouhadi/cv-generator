import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t, i18n } = useTranslation("global");
  return (
    <div id="pdf-content" className="h-16 flex items-center justify-center ">
      <h1>{t("sidebar.dashboard")}</h1>
    </div>
  );
};

export default Dashboard;
