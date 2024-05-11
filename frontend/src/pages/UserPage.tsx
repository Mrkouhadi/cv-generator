import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import EducationCard from "../components/cards/EducationCard";
import ExperienceCard from "../components/cards/ExperienceCard";
import LanguageCard from "../components/cards/LanguageCard";
import SkillCard from "../components/cards/SkillCard";
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
  const params = useParams();
  const id = params.id ? parseInt(params.id, 10) : undefined;
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
  }, [showModal, id]);

  return (
    <div className="relative h-screen px-2 py-8">
      <button
        className="absolute left-4 top-4  bg-red-400 p-2 rounded-full"
        onClick={() => navigate(-1)}
      >
        <ArrowUturnLeftIcon className="w-6 h-6 text-white" />
      </button>
      <Link
        to={"/generate-templates"}
        state={{ user, educations, experiences, skills, languages }}
        className="absolute right-4 text-white top-4  bg-red-400 p-2 rounded"
      >
        Generate a template
      </Link>
      <div className="py-">
        <p className="text-center font-extrabold text-3xl tracking-wide">
          {user && <>{user?.Name}</>}
        </p>
        <p className="text-center font- text-xl tracking-wide">
          {user && <>{user?.JobTitle}</>}
        </p>
        <div className="flex items-center flex-wrap gap-4 mt-4">
          <p className="">
            <span className="font-bold">Email: </span>
            {user?.Email}
          </p>
          <p className="">
            <span className="font-bold">Telephone: </span>
            {user?.Telephone}
          </p>
          <p className="">
            <span className="font-bold">Nationality: </span>
            {user?.Nationality}
          </p>
          <p className="">
            <span className="font-bold">Address: </span>
            {user?.Address}
          </p>
          <p className="">
            <span className="font-bold">Birth Date: </span>
            {
              typeof user?.Birthdate === "string" // Check if Birthdate is a string
                ? (user?.Birthdate as string).substring(0, 10) // Use substring method on strings
                : user?.Birthdate instanceof Date // Check if Birthdate is a Date object
                ? user?.Birthdate.toLocaleDateString().substring(0, 10) // Format Date object into a string and use substring method
                : "Unknown" // Handle other types or unexpected values
            }
          </p>
        </div>
        <p className="mt-4">
          <span className="font-bold">Description:</span>
          {user?.Description}
        </p>
      </div>

      {/* fetch all experiences, educations, skills, languages */}
      <div className="my-4">
        {/* education */}
        <div className="flex items-center justify-between bg-red-300 text-black p-4 my-2 rounded">
          <h1 className="">Education:</h1>
          <button
            onClick={() => handleOpen("education")}
            className="rounded bg-primary text-white px-4 py-2 "
          >
            Add
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {educations &&
            educations?.map((edu) => {
              return <EducationCard key={edu.ID} education={edu} />;
            })}
        </div>
      </div>
      {/* experience */}
      <div className="flex items-center justify-between bg-red-300 text-black p-4 my-2 rounded">
        <h1 className="">Experience:</h1>
        <button
          onClick={() => handleOpen("experience")}
          className="rounded bg-primary text-white px-4 py-2"
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {experiences &&
          experiences?.map((exp) => {
            return <ExperienceCard key={exp.ID} experience={exp} />;
          })}
      </div>
      {/* skills */}
      <div className="flex items-center justify-between bg-red-300 text-black p-4 my-2 rounded">
        <h1 className="">Skills:</h1>
        <button
          onClick={() => handleOpen("skill")}
          className="rounded bg-primary text-white px-4 py-2"
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {skills &&
          skills?.map((sk) => {
            return <SkillCard key={sk.ID} skill={sk} />;
          })}
      </div>
      {/* languages */}
      <div className="flex items-center justify-between bg-red-300 text-black p-4 my-2 rounded">
        <h1 className="">Languages:</h1>
        <button
          onClick={() => handleOpen("language")}
          className="rounded bg-primary text-white px-4 py-2"
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-12">
        {languages &&
          languages?.map((lan) => {
            return <LanguageCard key={lan.ID} language={lan} />;
          })}
      </div>

      <Modal show={showModal} onClose={handleClose}>
        {(() => {
          // Immediately-invoked function expression (IIFE) to allow return statements
          switch (ModalForm) {
            case "education":
              return <Education ID={id} />;
            case "experience":
              return <Experience ID={id} />;
            case "skill":
              return <Skill ID={id} />;
            case "language":
              return <Language ID={id} />;
            default:
              return null; // Default case should return null or fallback component
          }
        })()}
      </Modal>
    </div>
  );
};
export default UserPage;
