import { useTranslation } from "react-i18next";

const Setting: React.FC = () => {
  const [t, _] = useTranslation("global");
  return <div className="min-h-screen p-4">{t("sidebar.setting")}</div>;
};
export default Setting;
