// for A4: 595 x 842 points (1120 pixels for height X 791 pixels for width)
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "../../utils/helpers";

const Canadian1: React.FC<any> = ({ data }: any) => {
  const [t, _] = useTranslation("global");
  const [tp, __] = useTranslation("pages");

  if (data == null) return <h1>Loading..</h1>;
  return (
    // for A4: 595 x 842 points (1120 pixels for height X 791 pixels for width)
    <section className="text-start tracking-wide shadow-lg h-[1120px] w-[791px] p-6 bg-bg-light-1 text-font-light-1 rounded-lg overflow-hidden">
      <div className="text-4xl tracking-widest py-4 text-start border border-0 border-b-2 border-gray-300">
        <span className="font-bold text-4xl">
          {capitalizeFirstLetter(data?.user.Name)}
        </span>
        <p className="text-xl mt-4">
          {capitalizeFirstLetter(data?.user.JobTitle)}
        </p>
      </div>
      <div className="grid grid-cols-5 py-4">
        {/* personal details + education + skills + languages */}
        <div className="col-span-2 flex flex-col gap-2 pr-4 gap-4">
          <div className="flex flex-col gap-2">
            <div className="">
              <p className="font-bold">{t("personalDetails.email")}</p>
              <p className="">{capitalizeFirstLetter(data?.user?.Email)}</p>
            </div>
            <div className="">
              <p className="font-bold">{t("personalDetails.telephone")}</p>
              <p className="">{data?.user?.Telephone}</p>
            </div>
            <div className="">
              <p className="font-bold">{t("personalDetails.nationality")}</p>
              <p className="">
                {capitalizeFirstLetter(data?.user?.Nationality)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="bg-bg-light-2 p-2 font-bold">
              {tp("titles.education")}
            </h1>
            {data &&
              data?.educations.map((e: any) => (
                <div key={e.ID} className="text-sm">
                  <p className="">
                    <span className="font-bold">
                      {capitalizeFirstLetter(e.Degree)}{" "}
                    </span>{" "}
                    - {capitalizeFirstLetter(e.Major)}
                  </p>
                  <p className="">{capitalizeFirstLetter(e.University)}</p>
                  <div className="flex items-center justify-between">
                    <p className="">{capitalizeFirstLetter(e.Country)}</p>
                    <p className="">{capitalizeFirstLetter(e.City)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="">
                      {
                        typeof e.EndDate === "string" // Check if Birthdate is a string
                          ? (e.EndDate as string).substring(0, 10) // Use substring method on strings
                          : e.EndDate instanceof Date // Check if Birthdate is a Date object
                          ? e.EndDate.toLocaleDateString().substring(0, 10) // Format Date object into a string and use substring method
                          : "Unknown" // Handle other types or unexpected values
                      }
                    </p>
                    <p className="">
                      {
                        typeof e.StartDate === "string" // Check if Birthdate is a string
                          ? (e.StartDate as string).substring(0, 10) // Use substring method on strings
                          : e.StartDate instanceof Date // Check if Birthdate is a Date object
                          ? e.StartDate.toLocaleDateString().substring(0, 10) // Format Date object into a string and use substring method
                          : "Unknown" // Handle other types or unexpected values
                      }
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="">
            <div className="flex items-center px-2 h-10 bg-bg-light-2 ">
              <h1 className="font-bold ">{tp("titles.skills")}</h1>
            </div>
            {data &&
              data?.skills.map((sk: any) => (
                <div key={sk.ID} className="">
                  <div className="text-sm flex items-center justify-between py-1">
                    <p className="font-bold ">
                      {capitalizeFirstLetter(sk.Title)}
                    </p>
                    <p>{capitalizeFirstLetter(sk.Proficiency)}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="">
            <h1 className="bg-bg-light-2 p-2 font-bold">
              {tp("titles.languages")}
            </h1>
            {data &&
              data?.languages.map((lan: any) => (
                <div
                  key={lan.ID}
                  className="text-sm flex items-center justify-between py-1"
                >
                  <p className="font-bold ">
                    {capitalizeFirstLetter(lan.Language)}
                  </p>
                  <p>{capitalizeFirstLetter(lan.Proficiency)}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="col-span-3 border border-0 border-l-2 border-gray-300 flex flex-col gap-2 pl-4 ">
          <div className="">
            <h1 className="bg-bg-light-2 p-2 font-bold">
              {t("personalDetails.personalSummary")}
            </h1>
            <p className="text-sm">
              {capitalizeFirstLetter(data.user.Description)}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="bg-bg-light-2 p-2 font-bold">
              {tp("titles.experience")}
            </h1>
            {data &&
              data?.experiences.map((exp: any) => (
                <div key={exp.ID} className="mb-4">
                  <p className="font-bold">
                    {capitalizeFirstLetter(exp.JobTitle)} -{" "}
                    {capitalizeFirstLetter(exp.Company)}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <p className="">
                      {capitalizeFirstLetter(exp.Country)} -{" "}
                      {capitalizeFirstLetter(exp.City)}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="">
                        {
                          typeof exp.StartDate === "string" // Check if Birthdate is a string
                            ? (exp.StartDate as string).substring(0, 7) // Use substring method on strings
                            : exp.StartDate instanceof Date // Check if Birthdate is a Date object
                            ? exp.StartDate.toLocaleDateString().substring(
                                0,
                                10
                              ) // Format Date object into a string and use substring method
                            : "Unknown" // Handle other types or unexpected values
                        }
                      </p>
                      -
                      <p className="">
                        {
                          typeof exp.StartDate === "string" // Check if Birthdate is a string
                            ? (exp.StartDate as string).substring(0, 7) // Use substring method on strings
                            : exp.StartDate instanceof Date // Check if Birthdate is a Date object
                            ? exp.StartDate.toLocaleDateString().substring(
                                0,
                                10
                              ) // Format Date object into a string and use substring method
                            : "Unknown" // Handle other types or unexpected values
                        }
                      </p>
                    </div>
                  </div>
                  <p className="text-sm mt-2">
                    {capitalizeFirstLetter(exp.Description)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Canadian1;
