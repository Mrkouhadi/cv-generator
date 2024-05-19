import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { deleteEducation } from "../../state/EducationSlice";
import { AppDispatch } from "../../state/store";
import { Education as eduType } from "../../utils/types";
import Education from "../forms/Education";
import Modal from "../Modal";

type ProspType = {
  education: eduType;
};
const EducationCard: React.FC<ProspType> = ({ education }) => {
  const [t, _] = useTranslation("global");
  const [tp, __] = useTranslation("pages");

  const dispatch: AppDispatch = useDispatch();
  // Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="bg-bg-light-1 dark:bg-bg-dark-2 p-2 flex flex-col gap-2 shadow hover:shadow-lg">
      <div className="flex items-center justify-between">
        <p className="">
          <span className="font-bold">{tp("education.degree")}: </span>
          {education.Degree}
        </p>
        <p className="text-start">
          <span className="font-bold ">{tp("education.major")}:</span>
          {education.Major}
        </p>
      </div>
      <p className="">
        <span className="font-bold">{tp("education.university")}:</span>
        {education.University}
      </p>
      <div className="flex items-center justify-between">
        <p className="">
          <span className="font-bold">{tp("education.started")}:</span>
          {
            typeof education.StartDate === "string" // Check if Birthdate is a string
              ? (education.StartDate as string).substring(0, 10) // Use substring method on strings
              : education.StartDate instanceof Date // Check if Birthdate is a Date object
              ? education.StartDate.toLocaleDateString().substring(0, 10) // Format Date object into a string and use substring method
              : "Unknown" // Handle other types or unexpected values
          }
        </p>
        <p className="">
          <span className="font-bold">{tp("education.finished")}:</span>
          {
            typeof education.EndDate === "string" // Check if Birthdate is a string
              ? (education.EndDate as string).substring(0, 10) // Use substring method on strings
              : education.EndDate instanceof Date // Check if Birthdate is a Date object
              ? education.EndDate.toLocaleDateString().substring(0, 10) // Format Date object into a string and use substring method
              : "Unknown" // Handle other types or unexpected values
          }
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="">
          <span className="font-bold">{tp("education.country")}:</span>
          {education.Country}
        </p>
        <p className="">
          <span className="font-bold"> {tp("education.city")}: </span>
          {education.City}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => dispatch(deleteEducation(education.ID!))}
          className="bg-red-500 text-white p-2 rounded"
        >
          {t("button.delete")}
        </button>
        <button
          onClick={handleOpen}
          className="bg-green-600 text-white p-2 px-4 rounded"
        >
          {t("button.edit")}
        </button>
      </div>
      <Modal show={showModal} onClose={handleClose}>
        <Education ID={education.UserID} TobeUpdated={education} />
      </Modal>
    </div>
  );
};
export default EducationCard;
