import { useTranslation } from "react-i18next";

const Setting = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className=" h-screen">
      <h1> {t("sidebar.setting")}</h1>
    </div>
  );
};
export default Setting;
