import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

const UserPage = () => {
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

  useEffect(() => {
    dispatch(fetchUserByID(Number(id)));
    dispatch(fetchAllEducations(Number(id)));
    dispatch(fetchAllExperiences(Number(id)));
    dispatch(fetchAllLanguages(Number(id)));
    dispatch(fetchAllSkills(Number(id)));
  }, []);

  return (
    <div className="relative h-screen">
      <button
        className="absolute left-4 top-4  bg-red-400 p-2 rounded-full"
        onClick={() => navigate(-1)}
      >
        <ArrowUturnLeftIcon className="w-6 h-6 text-white" />
      </button>

      <div className="">{user && <>{user?.Name}</>}</div>

      {/* fetch all experiences, educations, skills, languages */}
      <div className="my-4">
        {educations &&
          educations.map((lan) => {
            return <p className="">{lan.Degree}</p>;
          })}
      </div>
      <div className="my-4">
        {experiences &&
          experiences.map((lan) => {
            return <p className="">{lan.Field}</p>;
          })}
      </div>
      <div className="my-4">
        {skills &&
          skills.map((lan) => {
            return <p className="">{lan.Title}</p>;
          })}
      </div>
      <div className="my-4">
        {languages &&
          languages.map((lan) => {
            return <p className="">{lan.Language}</p>;
          })}
      </div>
    </div>
  );
};

export default UserPage;
