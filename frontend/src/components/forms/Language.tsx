import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addLanguage, updateLanguage } from "../../state/LanguageSlice";
import { AppDispatch } from "../../state/store";
import { Language as LanguageType } from "../../utils/types";
import Toast from "../Taost";

type LangProps = {
  ID?: number;
  TobeUpdated?: LanguageType;
};
const Language: React.FC<LangProps> = ({ ID = 0, TobeUpdated }) => {
  const [t, _] = useTranslation("global");
  const [tp, __] = useTranslation("pages");
  // the toast state
  const [toast, setToats] = useState({ message: "", type: "" });
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
        setToats({
          message: "A language has been updated successfully",
          type: "success",
        });
      } else {
        dispatch(addLanguage(ln));
        setToats({
          message: "A Language has been added successfully",
          type: "success",
        });
        setLanguage("");
        setProficiency("beginner");
      }
    } else {
      setToats({
        message: "Please fill in the necessary form inputs",
        type: "failure",
      });
    }
  };

  useEffect(() => {
    if (TobeUpdated) {
      setLanguage(TobeUpdated?.Language);
      setProficiency(TobeUpdated?.Proficiency);
    }
  }, []);

  // empty the toast after 2 seconds
  useEffect(() => {
    const timeOutID = setTimeout(() => {
      setToats({ message: "", type: "" });
    }, 2000);
    return () => clearTimeout(timeOutID);
  }, [handleSubmit]);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-[30vh] p-4 gap-4 px-12 flex justify-center bg-bg-light-2 dark:bg-bg-dark-2 dark:text-font-dark-1 text-font-light-1 rounded"
      >
        <div className="flex items-center gap-2 relative w-full">
          <label className="w-24" htmlFor="language">
            {tp("titles.language")}:
          </label>
          <input
            type="text"
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            id="language"
            placeholder=""
            className="p-2 rounded bg-bg-light-1 dark:bg-bg-dark-1"
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
            <option value={tp("proficiency.beginner")}>
              {tp("proficiency.beginner")}
            </option>
            <option value={tp("proficiency.elementary")}>
              {tp("proficiency.elementary")}
            </option>
            <option value={tp("proficiency.proficient")}>
              {tp("proficiency.proficient")}
            </option>
            <option value={tp("proficiency.advanced")}>
              {tp("proficiency.advanced")}
            </option>
            <option value={tp("proficiency.native")}>
              {tp("proficiency.native")}
            </option>
          </select>
          {errors.proficiency && (
            <p className="text-red-500 text-sm absolute -bottom-6">
              {errors.proficiency}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center w-64">
          <button
            type="submit"
            className="bg-primary text-white rounded p-2 px-2"
          >
            {TobeUpdated ? t("button.save") : t("button.add")}
          </button>
        </div>
        <div
          className={`${
            toast.message !== "" ? "flex" : "hidden"
          } absolute right-0 bottom-0 `}
        >
          <Toast type={toast.type}>
            <div className="p-4">{toast.message}</div>
          </Toast>
        </div>
      </form>
    </>
  );
};
export default Language;
