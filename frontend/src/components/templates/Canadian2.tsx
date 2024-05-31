// for A4: 595 x 842 points (1120 pixels for height X 791 pixels for width)
import {
  CalendarDaysIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { Education, Experience, Language, Skill } from "../../utils/types";

const Canadian2: React.FC<any> = ({ data }: any) => {
  const [tp, __] = useTranslation("pages");
  const [imageLoaded, setImageLoaded] = useState(false); // State to track image loading

  const handleImageLoad = () => {
    setImageLoaded(true); // Set imageLoaded state to true when image is loaded
  };
  if (data == null) return <h1>Loading..</h1>;
  return (
    // for A4: 595 x 842 points (1120 pixels for height X 791 pixels for width)
    <section className="text-start tracking-wide shadow-lg h-[1120px] w-[791px] bg-bg-light-1 text-font-light-1 rounded-lg overflow-hidden flex">
      <div className="bg-blue-200 w-64 h-full p-4">
        {/* Profile */}
        <div className="flex flex-col gap-2 mb-4">
          <img
            src={"http://localhost:34115/" + data?.user?.Photo}
            alt={data?.user?.Name}
            className="h-[200px] w-[200px] rounded-full border border-4 border-gray-200"
            onLoad={handleImageLoad} // Call handleImageLoad when image is loaded
          />
          <h1 className="font-bold text-center text-xl">
            {capitalizeFirstLetter(data?.user?.Name)}
          </h1>
          <h1 className="text-center text-xl">
            {capitalizeFirstLetter(data?.user?.JobTitle)}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="">
              <EnvelopeIcon className="size-5 text-gray-600" />
            </div>
            <p className="text-sm">
              {capitalizeFirstLetter(data?.user?.Email)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="">
              <PhoneIcon className="size-5 text-gray-600" />
            </div>
            <p className="text-sm">{data?.user?.Telephone}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="">
              <CalendarDaysIcon className="size-5 text-gray-600" />
            </div>
            <p className="text-sm">{data?.user?.Birthdate.substring(0, 10)}</p>
          </div>
          <div className="flex  gap-2">
            <div className="">
              <MapPinIcon className="size-5 text-gray-600" />
            </div>
            <p className="text-sm">
              {capitalizeFirstLetter(data?.user?.Address)}
            </p>
          </div>
        </div>
        {/* SKILLS */}
        <h1 className="text-center text-xl font-bold  border-0 border-b-2 border-gray-400 mb-2 h-10">
          {tp("titles.skills")}
        </h1>
        <div className="flex flex-col gap-2 min-h-16 mb-4">
          {data &&
            data?.skills?.map((s: Skill) => {
              return (
                <div key={s.ID} className="flex items-center justify-between">
                  <p className="text-sm">{capitalizeFirstLetter(s.Title)}</p>
                  <div className=" w-20">
                    <p className="text-sm">
                      {capitalizeFirstLetter(s.Proficiency)}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        {/* LANGUAGES */}

        <h1 className="text-center text-xl font-bold  border-0 border-b-2 border-gray-400 mb-2 h-10">
          {tp("titles.languages")}
        </h1>
        <div className="flex flex-col gap-2 min-h-16 mb-2">
          {data &&
            data?.languages?.map((l: Language) => {
              return (
                <div key={l.ID} className="flex items-center justify-between">
                  <p className="text-sm">{capitalizeFirstLetter(l.Language)}</p>
                  <div className=" w-20">
                    <p className="text-sm">
                      {capitalizeFirstLetter(l.Proficiency)}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        {/* HOBBIES */}
      </div>
      {/* the second the column for p.summary + experience + education */}
      <div className=" h-screen w-full p-4">
        {/* personal summary */}
        <p className=""> {capitalizeFirstLetter(data?.user?.Description)}</p>
        {/* experience */}
        <div className="">
          <h1 className="text-xl font-bold  border-0 border-b-2 border-gray-400 mb-2 h-10 mt-4">
            {tp("titles.experience")}
          </h1>
          {data &&
            data?.experiences?.map((ex: Experience) => {
              return (
                <div key={ex.ID} className="flex gap-2 mb-4">
                  <div className="flex flex-col gap-2 min-w-32">
                    <p className="text-md">
                      {capitalizeFirstLetter(ex.JobTitle)}
                    </p>
                    <p className="text-sm">
                      {capitalizeFirstLetter(ex.Company)}
                    </p>
                  </div>
                  <div className="">
                    <div className="">
                      <p className="">
                        {
                          typeof ex.StartDate === "string" // Check if Birthdate is a string
                            ? (ex.StartDate as string).substring(0, 7) // Use substring method on strings
                            : ex.StartDate instanceof Date // Check if Birthdate is a Date object
                            ? ex.StartDate.toLocaleDateString().substring(0, 10) // Format Date object into a string and use substring method
                            : "Unknown" // Handle other types or unexpected values
                        }
                        {"  "}-{"  "}
                        {
                          typeof ex.StartDate === "string" // Check if Birthdate is a string
                            ? (ex.StartDate as string).substring(0, 7) // Use substring method on strings
                            : ex.StartDate instanceof Date // Check if Birthdate is a Date object
                            ? ex.StartDate.toLocaleDateString().substring(0, 10) // Format Date object into a string and use substring method
                            : "Unknown" // Handle other types or unexpected values
                        }
                      </p>
                      <p className="text-sm">
                        {capitalizeFirstLetter(ex.Description)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* education */}

        <div className="">
          <h1 className="text-xl font-bold  border-0 border-b-2 border-gray-400 mb-2 h-10 mt-4">
            {tp("titles.education")}
          </h1>
          {data &&
            data?.educations?.map((ex: Education) => {
              return (
                <div key={ex.ID} className="flex gap-2 mb-4">
                  <div className="flex flex-col gap-2 min-w-32">
                    <p className="text-md">
                      {capitalizeFirstLetter(ex.Degree)}
                    </p>
                    <p className="text-sm">
                      {capitalizeFirstLetter(ex.University)}
                    </p>
                  </div>
                  <div className="">
                    <div className="">
                      <p className="text-sm">
                        {capitalizeFirstLetter(ex.Major)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
export default Canadian2;
