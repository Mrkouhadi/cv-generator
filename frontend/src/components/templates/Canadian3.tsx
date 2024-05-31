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

const Canadian3: React.FC<any> = ({ data }: any) => {
  const [tp, __] = useTranslation("pages");
  const [imageLoaded, setImageLoaded] = useState(false); // State to track image loading

  const handleImageLoad = () => {
    setImageLoaded(true); // Set imageLoaded state to true when image is loaded
  };
  if (data == null) return <h1>Loading..</h1>;
  return (
    // for A4: 595 x 842 points (1120 pixels for height X 791 pixels for width)
    <section className="text-start tracking-wide shadow-lg h-[1120px] w-[791px] bg-bg-light-1 text-font-light-1 rounded-lg overflow-hidden">
      <header className="bg-blue-200 p-4 flex justify-center items-center gap-2">
        <p className="text-sm"> {capitalizeFirstLetter(data?.user?.Address)}</p>{" "}
        |<p className="text-sm">5555-5555-5555-5555</p> |
        <p className="text-sm"> {capitalizeFirstLetter(data?.user?.Email)}</p>
      </header>
      <div className="p-8">
        <h1 className="text-center text-2xl mb-4">
          {" "}
          {capitalizeFirstLetter(data?.user?.Name)}
        </h1>
        <div className="relative flex gap-4 border border-0 border-t-2 border-t-gray-600 py-4">
          <div className="w-52 bg-blue-200 h-2 absolute left-0 -top-[10px]"></div>
          <div className="min-w-52 min-h-44 bg-blue-200"></div>
          <div className="w-full min-h-44 bg-blue-200"></div>
        </div>
      </div>
    </section>
  );
};
export default Canadian3;
