import React, { useState } from "react";
import { AddExperience } from "../../../wailsjs/go/main/App";
import { Experience as ExperienceType } from "../../utils/types";

const Experience = () => {
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
        UserID: 6,
        Field: field,
        Company: company,
        StartDate: new Date(startDate),
        EndDate: new Date(endDate),
        Country: country,
        City: city,
        JobTitle: jobTitle,
        Description: desc,
      };
      AddExperience(JSON.stringify(exp)).then((d) => {
        console.log(d);
      });
      console.log("Form submitted successfully"); // FIXME: a modal to show the success message
      setField("");
      setCompany("");
      setCountry("");
      setCity("");
      setJobTitle("");
      setStartDate("");
      setEndDate("");
      setDesc("");
    } else {
      console.log("Form contains errors. Please fix them before submitting."); // FIXME: a modal to show the error
    }
  };
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
        Add Experience
      </button>
    </form>
  );
};

export default Experience;
