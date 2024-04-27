import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t, i18n } = useTranslation("global");

  return (
    <div className="h-screen">
      <h1> {t("sidebar.dashboard")}</h1>
    </div>
  );
};
export default Dashboard;
