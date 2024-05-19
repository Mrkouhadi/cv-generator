import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addSkill, updateSkill } from "../../state/SkillSlice";
import { AppDispatch } from "../../state/store";
import { Skill as SkillType } from "../../utils/types";
import Toast from "../Taost";

type SkillsProps = {
  ID?: number;
  TobeUpdated?: SkillType;
};
const Skill: React.FC<SkillsProps> = ({ ID = 0, TobeUpdated }) => {
  const [t, _] = useTranslation("global");
  const [tp, __] = useTranslation("pages");

  // the toast state
  const [toast, setToats] = useState({ message: "", type: "" });
  const dispatch: AppDispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("beginner");

  const [errors, setErrors] = useState({
    title: "",
    proficiency: "",
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Perform validation
    const newErrors = {
      title: title ? "" : "title is required",
      proficiency: proficiency ? "" : "Scale is required",
    };
    setErrors(newErrors);
    // Check if there are no validation errors
    const isValid = Object.values(newErrors).every((error) => error === "");
    if (isValid) {
      let sk: SkillType = {
        UserID: ID,
        Title: title,
        Proficiency: proficiency,
      };
      if (TobeUpdated) {
        sk.ID = TobeUpdated.ID;
        dispatch(updateSkill(sk));
        setToats({
          message: "A skill has been updated successfully",
          type: "success",
        });
      } else {
        dispatch(addSkill(sk));
        setToats({
          message: "A skill has been added successfully",
          type: "success",
        });
        setProficiency("beginner");
        setTitle("");
      }
    } else {
      setToats({
        message: "Please fill in the necessary form inputs",
        type: "failure",
      });
    }
  };
  // for update: if this form has received data to be updated we will populate the inputs first
  useEffect(() => {
    if (TobeUpdated) {
      setTitle(TobeUpdated.Title);
      setProficiency(TobeUpdated.Proficiency);
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
    <form
      onSubmit={handleSubmit}
      className="mt-[30vh] relative p-4 px-24 w-full flex items-center justify-center gap-4 bg-bg-light-2 dark:bg-bg-dark-2 dark:text-font-dark-1 text-font-light-1 rounded"
    >
      <div className="flex items-center gap-2 w-full relative  py-2">
        <label className="" htmlFor="title">
          {tp("titles.skill")}:
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          placeholder=""
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.title && (
          <p className="text-red-500 text-sm absolute -bottom-3 left-12">
            {errors.title}
          </p>
        )}
      </div>
      <div className="flex flex-col items-start gap-2 relative w-full">
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
        </select>
        {errors.proficiency && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.proficiency}
          </p>
        )}
      </div>
      <button type="submit" className="bg-primary text-white rounded p-2 px-4">
        {TobeUpdated ? t("button.save") : t("button.add")}
      </button>
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
  );
};
export default Skill;
// absolute right-0 top-0 bottom-0 w-16
