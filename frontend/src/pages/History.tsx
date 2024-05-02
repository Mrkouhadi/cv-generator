import { useState } from "react";
import { useTranslation } from "react-i18next";
import Education from "../components/forms/Education";
import Experience from "../components/forms/Experience";
import Language from "../components/forms/Language";
import PersonDetails from "../components/forms/PersonDetails";
import Skill from "../components/forms/Skill";

const History = () => {
  const { t } = useTranslation("global");
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const components = [
    <PersonDetails setCurrentComponentIndex={setCurrentComponentIndex} />,
    <Education />,
    <Experience />,
    <Skill />,
    <Language />,
  ];
  const totalComponents = components.length;
  const handleNext = () => {
    setCurrentComponentIndex((prevIndex) =>
      Math.min(prevIndex + 1, totalComponents - 1)
    );
  };

  const handleBack = () => {
    setCurrentComponentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  return (
    <div className="min-h-screen p-4">
      <h1>{t("sidebar.history")}</h1>
      {components[currentComponentIndex]}
      {currentComponentIndex !== 0 && (
        <div className="flex itemx-center justify-between px-24">
          <button
            className="bg-primary px-4 py-2 rounded my-2"
            onClick={handleBack}
            disabled={currentComponentIndex === 0}
          >
            Back
          </button>
          <button
            className="bg-primary px-4 py-2 rounded my-2"
            onClick={handleNext}
            disabled={currentComponentIndex === totalComponents - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default History;
