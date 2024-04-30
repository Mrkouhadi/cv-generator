import React, { useState } from "react";

const Skill = () => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [scale, setScale] = useState("");

  const [errors, setErrors] = useState({
    type: "",
    title: "",
    scale: "",
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Perform validation
    const newErrors = {
      type: type ? "" : "type is required",
      title: title ? "" : "title is required",
      scale: scale ? "" : "Scale is required",
    };
    setErrors(newErrors);
    // Check if there are no validation errors
    const isValid = Object.values(newErrors).every((error) => error === "");
    if (isValid) {
      console.log("Form submitted successfully"); // FIXME: a modal to show the success message
    } else {
      console.log("Form contains errors. Please fix them before submitting."); // FIXME: a modal to show the error
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative p-4 w-full flex items-center gap-6 bg-bg-light-2 dark:bg-bg-dark-2 dark:text-font-dark-1 text-font-light-1 rounded"
    >
      <div className="flex items-center gap-2 w-4/5 relative  py-2">
        <label className="" htmlFor="type">
          Type:
        </label>
        <input
          type="text"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          id="type"
          placeholder=""
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.type && (
          <p className="text-red-500 text-sm absolute -bottom-3 left-12">
            {errors.type}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 w-4/5 relative  py-2">
        <label className="" htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          placeholder=""
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.title && (
          <p className="text-red-500 text-sm absolute -bottom-3 left-12">
            {errors.title}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 w-4/5 relative py-2">
        <label className="" htmlFor="scale">
          Scale:
        </label>
        <input
          value={scale}
          onChange={(e) => setScale(e.target.value)}
          type="number"
          name="scale"
          id="scale"
          placeholder="1"
          min="1"
          max="5"
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.scale && (
          <p className="text-red-500 text-sm absolute -bottom-3 left-14">
            {errors.scale}
          </p>
        )}
      </div>
      <button type="submit" className="bg-primary text-white rounded p-2 px-4">
        +
      </button>
    </form>
  );
};
export default Skill;
// absolute right-0 top-0 bottom-0 w-16
