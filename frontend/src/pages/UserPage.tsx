import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Education from "../components/forms/Education";
import Experience from "../components/forms/Experience";
import Language from "../components/forms/Language";
import Skill from "../components/forms/Skill";
import Modal from "../components/Modal";
import {
  fetchAllEducations,
  selectAllEducations,
} from "../state/EducationSlice";
import {
  fetchAllExperiences,
  selectAllExperiences,
} from "../state/ExperienceSlice";
import { fetchAllLanguages, selectAllLanguages } from "../state/LanguageSlice";
import { fetchAllSkills, selectAllSkills } from "../state/SkillSlice";
import { AppDispatch, RootState } from "../state/store";
import { fetchUserByID, selectUserByID } from "../state/UserSlice";

const UserPage: React.FC = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) =>
    selectUserByID(state, Number(id))
  );
  const educations = useSelector((state: RootState) =>
    selectAllEducations(state)
  );
  const experiences = useSelector((state: RootState) =>
    selectAllExperiences(state)
  );
  const languages = useSelector((state: RootState) =>
    selectAllLanguages(state)
  );
  const skills = useSelector((state: RootState) => selectAllSkills(state));

  // Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const [ModalForm, setModalForm] = useState<string>("");

  const handleOpen = (form: string) => {
    setModalForm(form);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    dispatch(fetchUserByID(Number(id)));
    dispatch(fetchAllEducations(Number(id)));
    dispatch(fetchAllExperiences(Number(id)));
    dispatch(fetchAllLanguages(Number(id)));
    dispatch(fetchAllSkills(Number(id)));
  }, [showModal]);

  return (
    <div className="relative h-screen px-4">
      <button
        className="absolute left-4 top-4  bg-red-400 p-2 rounded-full"
        onClick={() => navigate(-1)}
      >
        <ArrowUturnLeftIcon className="w-6 h-6 text-white" />
      </button>
      <div className="">{user && <>{user?.Name}</>}</div>

      {/* fetch all experiences, educations, skills, languages */}
      <div className="my-4">
        {/* education */}
        <div className="flex items-center justify-between bg-red-300 text-black  p-4">
          <h1 className="">Education:</h1>
          <button
            onClick={() => handleOpen("education")}
            className="rounded bg-primary text-white px-4 py-2 "
          >
            Add
          </button>
        </div>
        {educations &&
          educations.map((edu) => {
            return <p className="">{edu.Degree}</p>;
          })}
      </div>
      {/* experience */}
      <div className="flex items-center justify-between bg-red-300 text-black  p-4">
        <h1 className="">Experience:</h1>
        <button
          onClick={() => handleOpen("experience")}
          className="rounded bg-primary text-white px-4 py-2"
        >
          Add
        </button>
      </div>
      <div className="my-4">
        {experiences &&
          experiences.map((exp) => {
            return <p className="">{exp.JobTitle}</p>;
          })}
      </div>
      {/* skills */}
      <div className="flex items-center justify-between bg-red-300 text-black p-4">
        <h1 className="">Skills:</h1>
        <button
          onClick={() => handleOpen("skill")}
          className="rounded bg-primary text-white px-4 py-2"
        >
          Add
        </button>
      </div>
      <div className="my-4">
        {skills &&
          skills.map((sk) => {
            return <p className="">{sk.Title}</p>;
          })}
      </div>
      {/* languages */}
      <div className="flex items-center justify-between bg-red-300 text-black p-4">
        <h1 className="">Languages:</h1>
        <button
          onClick={() => handleOpen("language")}
          className="rounded bg-primary text-white px-4 py-2"
        >
          Add
        </button>
      </div>
      <div className="my-4">
        {languages &&
          languages.map((lan) => {
            return <p className="">{lan.Language}</p>;
          })}
      </div>

      <Modal show={showModal} onClose={handleClose}>
        {(() => {
          // Immediately-invoked function expression (IIFE) to allow return statements
          switch (ModalForm) {
            case "education":
              return <Education ID={+id} />;
            case "experience":
              return <Experience ID={+id} />;
            case "skill":
              return <Skill ID={+id} />;
            case "language":
              return <Language ID={+id} />;
            default:
              return null; // Default case should return null or fallback component
          }
        })()}
      </Modal>
    </div>
  );
};
export default UserPage;
