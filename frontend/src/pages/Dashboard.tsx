import { useTranslation } from "react-i18next";
import Canadian1 from "../components/templates/Canadian1";

const Dashboard = () => {
  const { t, i18n } = useTranslation("global");
  return (
    <div
      id="pdf-content"
      className="m\h-full flex flex-col items-center justify-center p-12"
    >
      <h1>{t("sidebar.dashboard")}</h1>
      <Canadian1 />
    </div>
  );
};

export default Dashboard;
