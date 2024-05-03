import { useTranslation } from "react-i18next";
import Users from "../components/Users";

const Dashboard = () => {
  const { t, i18n } = useTranslation("global");
  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      <h1>{t("sidebar.dashboard")}</h1>
      <hr />

      <Users />
    </div>
  );
};

export default Dashboard;
