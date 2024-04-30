import React, { useState } from "react";

const Language = () => {
  const [language, setLanguage] = useState("");
  const [proficiency, setProficiency] = useState("beginner");

  const [errors, setErrors] = useState({
    language: "",
    proficiency: "",
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Perform validation
    const newErrors = {
      language: language ? "" : "language is required",
      proficiency: proficiency ? "" : "proficiency is required",
    };
    setErrors(newErrors);
    // Check if there are no validation errors
    const isValid = Object.values(newErrors).every((error) => error === "");
    if (isValid) {
      console.log("Form submitted successfully"); // FIXME: a modal to show the success message
      setErrors({
        language: "",
        proficiency: "",
      });
    } else {
      console.log("Form contains errors. Please fix them before submitting."); // FIXME: a modal to show the error
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 w-full flex items-center gap-6 bg-bg-light-2 dark:bg-bg-dark-2 dark:text-font-dark-1 text-font-light-1 rounded"
    >
      <div className="flex flex-col items-start gap-2 w-4/5 relative ">
        <input
          type="text"
          name="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          id="language"
          placeholder=""
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.language && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.language}
          </p>
        )}
      </div>
      <div className="flex flex-col items-start gap-2 w-4/5 relative ">
        <select
          id="proficiency"
          name="proficiency"
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
          className="p-2 h-10 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        >
          <option value="">Select proficiency level</option>
          <option value="beginner">Beginner</option>
          <option value="elementary">Elementary</option>
          <option value="proficient">Proficient</option>
          <option value="native">Native</option>
        </select>
        {errors.proficiency && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.proficiency}
          </p>
        )}
      </div>
      <div className="w-44 h-16 flex items-center justify-center">
        <button
          type="submit"
          className="bg-primary text-white rounded p-2 px-4"
        >
          +
        </button>
      </div>
    </form>
  );
};
export default Language;
