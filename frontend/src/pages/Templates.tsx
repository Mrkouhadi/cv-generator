import { useState } from "react";
import { useTranslation } from "react-i18next";
import PersonDetails from "../components/forms/PersonDetails";
import Modal from "../components/Modal";
import Canadian1 from "../components/templates/Canadian1";

const Templates: React.FC = () => {
  const { t } = useTranslation("global");

  return (
    <div className="min-h-screen p-4">
      <h1>{t("sidebar.templates")}</h1>
      <PersonDetails />
      <Canadian1 />
    </div>
  );
};

export default Templates;
