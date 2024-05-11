import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../state/ExperienceSlice";
import { AppDispatch } from "../../state/store";
import { Experience as expType } from "../../utils/types";
import Experience from "../forms/Experience";
import Modal from "../Modal";
type ProspType = {
  experience: expType;
};
const ExperienceCard: React.FC<ProspType> = ({ experience }) => {
  const dispatch: AppDispatch = useDispatch();
  // Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <div className="bg-bg-light-1 dark:bg-bg-dark-2 p-2 flex min-h-44 flex-col justify-between gap-2 shadow hover:shadow-lg">
      <div className="flex items-center justify-between">
        <p className="">
          <span className="font-bold">Job Title: </span>
          {experience.Field}
        </p>
        <p className="text-start">
          <span className="font-bold ">Field: </span>
          {experience.Field}
        </p>
      </div>

      <p className="">
        <span className="font-bold">Company: </span>
        {experience.Company}
      </p>
      <div className="flex items-center justify-between">
        <p className="">
          <span className="font-bold">Started: </span>
          {
            typeof experience.StartDate === "string" // Check if Birthdate is a string
              ? (experience.StartDate as string).substring(0, 10) // Use substring method on strings
              : experience.StartDate instanceof Date // Check if Birthdate is a Date object
              ? experience.StartDate.toLocaleDateString().substring(0, 10) // Format Date object into a string and use substring method
              : "Unknown" // Handle other types or unexpected values
          }
        </p>
        <p className="">
          <span className="font-bold">Ended: </span>
          {
            typeof experience.EndDate === "string" // Check if Birthdate is a string
              ? (experience.EndDate as string).substring(0, 10) // Use substring method on strings
              : experience.EndDate instanceof Date // Check if Birthdate is a Date object
              ? experience.EndDate.toLocaleDateString().substring(0, 10) // Format Date object into a string and use substring method
              : "Unknown" // Handle other types or unexpected values
          }
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="">
          <span className="font-bold">Country: </span>
          {experience.Country}
        </p>
        <p className="">
          <span className="font-bold">City: </span>
          {experience.City}
        </p>
      </div>
      <p className="">
        <span className="font-bold">Description: </span>

        {experience.Description}
      </p>

      <div className="flex items-center justify-between">
        <button
          onClick={() => dispatch(deleteExperience(experience.ID!))}
          className="bg-red-500 text-white p-2 rounded"
        >
          Delete
        </button>
        <button
          onClick={handleOpen}
          className="bg-green-600 text-white p-2 px-4 rounded"
        >
          Edit
        </button>
      </div>
      <Modal show={showModal} onClose={handleClose}>
        <Experience ID={experience.UserID} TobeUpdated={experience} />
      </Modal>
    </div>
  );
};

export default ExperienceCard;
