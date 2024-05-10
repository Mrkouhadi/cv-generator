import React from "react";
import { Education } from "../../utils/types";

type ProspType = {
  education: Education;
};
const EducationCard: React.FC<ProspType> = ({ education }) => {
  console.log(education);
  return (
    <div className="bg-bg-light-1 dark:bg-bg-dark-2 p-2 flex flex-col gap-2 shadow hover:shadow-lg">
      <div className="flex items-center justify-between">
        <p className="">
          <span className="font-bold">Degree: </span>
          {education.Degree}
        </p>
        <p className="text-start">
          <span className="font-bold ">Major:</span>
          {education.Major}
        </p>
      </div>

      <p className="">
        <span className="font-bold">University:</span>
        {education.University}
      </p>
      <div className="flex items-center justify-between">
        <p className="">
          <span className="font-bold">Started:</span>
          {
            typeof education.StartDate === "string" // Check if Birthdate is a string
              ? (education.StartDate as string).substring(0, 10) // Use substring method on strings
              : education.StartDate instanceof Date // Check if Birthdate is a Date object
              ? education.StartDate.toLocaleDateString().substring(0, 10) // Format Date object into a string and use substring method
              : "Unknown" // Handle other types or unexpected values
          }
        </p>
        <p className="">
          <span className="font-bold">Finished:</span>
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
          <span className="font-bold">Country:</span>
          {education.Country}
        </p>
        <p className="">
          <span className="font-bold">City:</span>
          {education.City}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-red-500 text-white p-2 rounded">Delete</button>
        <button className="bg-green-600 text-white p-2 px-4 rounded">
          Edit
        </button>
      </div>
    </div>
  );
};
export default EducationCard;
