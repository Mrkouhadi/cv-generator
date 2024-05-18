import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addExperience, updateExperience } from "../../state/ExperienceSlice";
import { AppDispatch } from "../../state/store";
import { Experience as ExperienceType } from "../../utils/types";
import Toast from "../Taost";
type ExpProps = {
  ID?: number;
  TobeUpdated?: ExperienceType;
};
const Experience: React.FC<ExpProps> = ({ ID = 0, TobeUpdated }) => {
  // the toast state
  const [toast, setToats] = useState({ message: "", type: "" });
  const dispatch: AppDispatch = useDispatch();

  const [field, setField] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const [errors, setErrors] = useState({
    field: "",
    company: "",
    jobTitle: "",
    desc: "",
    startDate: "",
    endDate: "",
    country: "",
    city: "",
  });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Perform validation
    const newErrors = {
      field: field ? "" : "Field is required",
      company: company ? "" : "Company is required",
      startDate: startDate ? "" : "Start date is required",
      endDate: endDate ? "" : "End date is required",
      country: country ? "" : "Country is required",
      city: city ? "" : "City is required",
      desc: desc ? "" : "description is required",
      jobTitle: jobTitle ? "" : "Job Title is required",
    };
    setErrors(newErrors);
    // Check if there are no validation errors
    const isValid = Object.values(newErrors).every((error) => error === "");
    if (isValid) {
      let exp: ExperienceType = {
        UserID: ID,
        Field: field,
        Company: company,
        StartDate: new Date(startDate),
        EndDate: new Date(endDate),
        Country: country,
        City: city,
        JobTitle: jobTitle,
        Description: desc,
      };
      if (TobeUpdated) {
        exp.ID = TobeUpdated.ID;
        dispatch(updateExperience(exp));
        setToats({
          message: "Experience has been updated successfully",
          type: "success",
        });
      } else {
        dispatch(addExperience(exp));
        setToats({
          message: "Experience has been added successfully",
          type: "success",
        });
        setField("");
        setCompany("");
        setCountry("");
        setCity("");
        setJobTitle("");
        setStartDate("");
        setEndDate("");
        setDesc("");
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
      setField(TobeUpdated.Field);
      setCompany(TobeUpdated.Company);
      setJobTitle(TobeUpdated.JobTitle);
      setDesc(TobeUpdated.Description);
      setCountry(TobeUpdated.Country);
      setCity(TobeUpdated.City);
      // Convert the endate to YYYY-MM-DD format
      const formattedendDate = new Date(TobeUpdated.EndDate)
        .toISOString()
        .split("T")[0];
      setEndDate(formattedendDate);
      // Convert the endate to YYYY-MM-DD format
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
      className="p-4 w-full flex flex-col items-center gap-6 bg-bg-light-2 dark:bg-bg-dark-2 dark:text-font-dark-1 text-font-light-1 rounded"
    >
      <div className="flex flex-col items-start gap-2 w-4/5 relative ">
        <label className="" htmlFor="field">
          field
        </label>
        <input
          value={field}
          onChange={(e) => setField(e.target.value)}
          type="text"
          name="field"
          id="field"
          placeholder=""
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.field && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.field}
          </p>
        )}
      </div>
      <div className="flex flex-col items-start gap-2 w-4/5 relative ">
        <label className="" htmlFor="company">
          company
        </label>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          type="text"
          name="company"
          id="company"
          placeholder=""
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.company && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.company}
          </p>
        )}
      </div>
      <div className="flex flex-col items-start gap-2 w-4/5 relative ">
        <label className="" htmlFor="expjobTitle">
          Job Title
        </label>
        <input
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          type="text"
          name="expjobTitle"
          id="expjobTitle"
          placeholder=""
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.jobTitle}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between w-4/5 gap-12">
        <div className="flex flex-col items-start gap-2 w-4/5 relative ">
          <label className="" htmlFor="expstartDate">
            Start Date
          </label>
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            name="expstartDate"
            id="expstartDate"
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
          <label className="" htmlFor="expendDate">
            End Date
          </label>
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            name="expendDate"
            id="expendDate"
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
          <label className="" htmlFor="expcountry">
            Country
          </label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="expcountry"
            id="expcountry"
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
          <label className="" htmlFor="expcity">
            City
          </label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            name="expcity"
            id="expcity"
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
      <div className="flex flex-col items-start gap-2 w-4/5 relative">
        <label className="" htmlFor="desc">
          Description
        </label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder=""
          name="desc"
          id="desc"
          className="resize-none p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
          rows={6}
        />
        {errors.desc && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.desc}
          </p>
        )}
      </div>
      <button type="submit" className="p-2 bg-primary text-white rounded w-4/5">
        {TobeUpdated ? "Update Experience" : "Add Experience"}
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

export default Experience;
