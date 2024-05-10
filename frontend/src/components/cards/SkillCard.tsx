import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { Skill as skillType } from "../../utils/types";
import { deleteSkill, updateSkill } from "../../state/SkillSlice";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../Modal";
import Skill from "../forms/Skill";

type ProspType = {
  skill: skillType;
};

const SkillCard: React.FC<ProspType> = ({ skill }) => {
  const dispatch: AppDispatch = useDispatch();
  // Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="bg-bg-light-1 dark:bg-bg-dark-2 p-2 rounded flex items-center justify-between">
      <p className="">{skill.Title}</p>
      <p className="">{skill.Proficiency}</p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            dispatch(deleteSkill(skill.ID!));
          }}
          className=" text-white p-1 rounded text-sm"
        >
          <TrashIcon className="w-5 h-5 text-red-500" />
        </button>

        <button
          onClick={handleOpen}
          className=" text-white p-1 rounded text-sm"
        >
          <PencilIcon className="w-5 h-5 text-red-500" />
        </button>
      </div>
      <Modal show={showModal} onClose={handleClose}>
        <Skill ID={skill.UserID} TobeUpdated={skill} />
      </Modal>
    </div>
  );
};

export default SkillCard;
