import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Users from "../components/Users";

const Dashboard: React.FC = () => {
  const { t } = useTranslation("global");

  return (
    <div className="flex flex-col items-center p-4 h-screen overflow-y-scroll">
      <h1>{t("sidebar.dashboard")}</h1>
      <hr />
      <Users />
    </div>
  );
};

export default Dashboard;
