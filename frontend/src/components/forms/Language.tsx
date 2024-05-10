import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addLanguage, updateLanguage } from "../../state/LanguageSlice";
import { AppDispatch } from "../../state/store";
import { Language as LanguageType } from "../../utils/types";

type LangProps = {
  ID?: number;
  TobeUpdated?: LanguageType;
};
const Language: React.FC<LangProps> = ({ ID = 0, TobeUpdated }) => {
  const dispatch: AppDispatch = useDispatch();
  const [language, setLanguage] = useState("");
  const [proficiency, setProficiency] = useState("beginner");

  const [errors, setErrors] = useState({
    language: "",
    proficiency: "",
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Perform validation
    const newErrors = {
      language: language ? "" : "language is required",
      proficiency: proficiency ? "" : "proficiency is required",
    };
    setErrors(newErrors);
    // Check if there are no validation errors
    const isValid = Object.values(newErrors).every((error) => error === "");
    if (isValid) {
      let ln: LanguageType = {
        UserID: ID,
        Language: language,
        Proficiency: proficiency,
      };
      if (TobeUpdated) {
        ln.ID = TobeUpdated.ID;
        dispatch(updateLanguage(ln));
      } else {
        dispatch(addLanguage(ln));
        setLanguage("");
        setProficiency("beginner");
      }
    } else {
      console.log("Form contains errors. Please fix them before submitting."); // FIXME: a modal to show the error
    }
  };

  useEffect(() => {
    if (TobeUpdated) {
      setLanguage(TobeUpdated?.Language);
      setProficiency(TobeUpdated?.Proficiency);
    }
  }, []);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 gap-4 px-24 flex justify-center bg-bg-light-2 dark:bg-bg-dark-2 dark:text-font-dark-1 text-font-light-1 rounded"
      >
        <div className=" flex items-center gap-2 relative w-full">
          <label className="" htmlFor="language">
            Language:
          </label>
          <input
            type="text"
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            id="language"
            placeholder=""
            className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
          />
          {errors.language && (
            <p className="text-red-500 text-sm absolute -bottom-6">
              {errors.language}
            </p>
          )}
        </div>
        <div className=" flex flex-col items-start gap-2 relative w-full">
          <select
            id="proficiency"
            name="proficiency"
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value)}
            className="p-2 h-10 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
          >
            <option value="">Select proficiency level</option>
            <option value="beginner">Beginner</option>
            <option value="elementary">Elementary</option>
            <option value="proficient">Proficient</option>
            <option value="native">Native</option>
          </select>
          {errors.proficiency && (
            <p className="text-red-500 text-sm absolute -bottom-6">
              {errors.proficiency}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-primary text-white rounded p-2 px-4"
          >
            +
          </button>
        </div>
      </form>
    </>
  );
};
export default Language;
