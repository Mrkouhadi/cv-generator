import { useTranslation } from "react-i18next";

const History = () => {
  const { t, i18n } = useTranslation("global");

  return (
    <div className=" h-screen">
      <h1> {t("sidebar.history")}</h1>
    </div>
  );
};
export default History;
