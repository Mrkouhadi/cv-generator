import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteLanguage } from "../../state/LanguageSlice";
import { AppDispatch } from "../../state/store";
import { Language as lanType } from "../../utils/types";
import Language from "../forms/Language";
import Modal from "../Modal";
type ProspType = {
  language: lanType;
};
const LanguageCard: React.FC<ProspType> = ({ language }) => {
  const dispatch: AppDispatch = useDispatch();
  // Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="bg-bg-light-1 dark:bg-bg-dark-2 p-2 rounded flex items-center justify-between">
      <p className="">{language.Language}</p>
      <p className="">{language.Proficiency}</p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            dispatch(deleteLanguage(language.ID!));
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
        <Language ID={language.UserID} TobeUpdated={language} />
      </Modal>
    </div>
  );
};

export default LanguageCard;
