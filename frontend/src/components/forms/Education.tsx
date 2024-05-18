import { useEffect, useState } from "react";
import { Education as EducationType } from "../../utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { addEducation, updateEducation } from "../../state/EducationSlice";
import Toast from "../Taost";

type EduProps = {
  ID?: number;
  TobeUpdated?: EducationType;
};
const Education: React.FC<EduProps> = ({ ID = 0, TobeUpdated }) => {
  // the toast state
  const [toast, setToats] = useState({ message: "", type: "" });
  const dispatch: AppDispatch = useDispatch();

  const [degree, setDegree] = useState("");
  const [major, setMajor] = useState("");
  const [university, setUniversity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({
    degree: "",
    major: "",
    university: "",
    startDate: "",
    endDate: "",
    country: "",
    city: "",
  });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Perform validation
    const newErrors = {
      degree: degree ? "" : "degree is required",
      major: major ? "" : "Major is required",
      university: university ? "" : "University is required",
      startDate: startDate ? "" : "start date is required",
      endDate: endDate ? "" : "end date is required",
      country: country ? "" : "country is required",
      city: city ? "" : "City is required",
    };
    setErrors(newErrors);
    // Check if there are no validation errors
    const isValid = Object.values(newErrors).every((error) => error === "");
    if (isValid) {
      let edu: EducationType = {
        UserID: ID,
        Degree: degree,
        Major: major,
        University: university,
        StartDate: new Date(startDate),
        EndDate: new Date(endDate),
        Country: country,
        City: city,
      };
      if (TobeUpdated) {
        edu.ID = TobeUpdated.ID;
        dispatch(updateEducation(edu));
        setToats({
          message: "Education has been updated successfully",
          type: "success",
        });
      } else {
        dispatch(addEducation(edu));
        setToats({
          message: "Education has been added successfully",
          type: "success",
        });
        setDegree("");
        setMajor("");
        setUniversity("");
        setStartDate("");
        setEndDate("");
        setCountry("");
        setCity("");
      }
    } else {
      setToats({
        message: "Please fill in the necessary form inputs",
        type: "failure",
      });
    }
  };

  // for update: if this form has received data to be updated we will populate the inputs first
  useEffect(() => {
    if (TobeUpdated) {
      setMajor(TobeUpdated.Major);
      setUniversity(TobeUpdated.University);
      setDegree(TobeUpdated.Degree);
      setCountry(TobeUpdated.Country);
      setCity(TobeUpdated.City);
      // Convert the endate to YYYY-MM-DD format
      const formattedendDate = new Date(TobeUpdated.EndDate)
        .toISOString()
        .split("T")[0];
      setEndDate(formattedendDate);
      // Convert the startdate to YYYY-MM-DD format
      const formattedstartDate = new Date(TobeUpdated.StartDate)
        .toISOString()
        .split("T")[0];
      setStartDate(formattedstartDate);
    }
  }, []);
  // empty the toast after 2 seconds
  useEffect(() => {
    const timeOutID = setTimeout(() => {
      setToats({ message: "", type: "" });
    }, 2000);
    return () => clearTimeout(timeOutID);
  }, [handleSubmit]);
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 py-20 w-full flex flex-col items-center gap-6 bg-bg-light-2 dark:bg-bg-dark-2 dark:text-font-dark-1 text-font-light-1 rounded"
    >
      <div className="flex items-center justify-between w-4/5 gap-12">
        <div className="flex flex-col items-start gap-2 w-4/5 relative ">
          <label className="" htmlFor="degree">
            Degree
          </label>
          <input
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            type="text"
            name="degree"
            id="degree"
            placeholder=""
            className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
          />
          {errors.degree && (
            <p className="text-red-500 text-sm absolute -bottom-6">
              {errors.degree}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start gap-2 w-4/5 relative ">
          <label className="" htmlFor="major">
            Major
          </label>
          <input
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            type="text"
            name="major"
            id="major"
            placeholder=""
            className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
          />
          {errors.major && (
            <p className="text-red-500 text-sm absolute -bottom-6">
              {errors.major}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 w-4/5 relative ">
        <label className="" htmlFor="university">
          University
        </label>
        <input
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          type="text"
          name="university"
          id="university"
          placeholder=""
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.university && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.university}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between w-4/5 gap-12">
        <div className="flex flex-col items-start gap-2 w-4/5 relative ">
          <label className="" htmlFor="startDate">
            Start Date
          </label>
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            name="startDate"
            id="startDate"
            placeholder=""
            className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm absolute -bottom-6">
              {errors.startDate}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start gap-2 w-4/5 relative ">
          <label className="" htmlFor="endDate">
            End Date
          </label>
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            name="endDate"
            id="endDate"
            placeholder=""
            className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm absolute -bottom-6">
              {errors.endDate}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between w-4/5 gap-12">
        <div className="flex flex-col items-start gap-2 w-4/5 relative ">
          <label className="" htmlFor="country">
            Country
          </label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
            id="country"
            placeholder=""
            className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
          />
          {errors.country && (
            <p className="text-red-500 text-sm absolute -bottom-6">
              {errors.country}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start gap-2 w-4/5 relative ">
          <label className="" htmlFor="city">
            City
          </label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            name="city"
            id="city"
            placeholder=""
            className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
          />
          {errors.city && (
            <p className="text-red-500 text-sm absolute -bottom-6">
              {errors.city}
            </p>
          )}
        </div>
      </div>
      <button type="submit" className="p-2 bg-primary text-white rounded w-4/5">
        {TobeUpdated ? "Update Education" : "Add Education"}
      </button>
      <div
        className={`${
          toast.message !== "" ? "flex" : "hidden"
        } absolute right-0 bottom-0 `}
      >
        <Toast type={toast.type}>
          <div className="p-4">{toast.message}</div>
        </Toast>
      </div>
    </form>
  );
};
export default Education;
