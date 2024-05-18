import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { addUser, updateUser } from "../../state/UserSlice";
import { User } from "../../utils/types";
import Toast from "../Taost";

interface PersonDetailsProps {
  userTobeUpdated?: User;
}

const PersonDetails: React.FC<PersonDetailsProps> = ({ userTobeUpdated }) => {
  // the toast state
  const [toast, setToats] = useState({ message: "", type: "" });
  // a dispatcher of redux-toolkit
  const dispatch: AppDispatch = useDispatch();
  // the user's data state
  const [imageSrc, setImageSrc] = useState<any>("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  // the errors state
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    birthdate: "",
    telephone: "",
    address: "",
    nationality: "",
    jobTitle: "",
    description: "",
    image: "",
  });
  // uploading images handler
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // the form submittion handler
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Perform validation
    const newErrors = {
      fullName: fullName ? "" : "Full Name is required",
      email: email ? "" : "Email is required",
      birthdate: birthdate ? "" : "Birth date is required",
      telephone: telephone ? "" : "Telephone is required",
      address: address ? "" : "Address is required",
      nationality: nationality ? "" : "nationality is required",
      jobTitle: jobTitle ? "" : "Job Title is required",
      description: description ? "" : "Description is required",
      image: imageSrc ? "" : "Image is required",
    };
    setErrors(newErrors);
    // Check if there are no validation errors
    const isValid = Object.values(newErrors).every((error) => error === "");
    if (isValid) {
      let u: User = {
        Name: fullName,
        Email: email,
        Photo: imageSrc,
        Birthdate: new Date(birthdate),
        Telephone: telephone,
        Address: address,
        Nationality: nationality,
        JobTitle: jobTitle,
        Description: description,
      };
      // in case of: updating user's data
      if (userTobeUpdated) {
        u.ID = userTobeUpdated.ID;
        dispatch(updateUser(u));
        setToats({
          message: "User has been updated successfully",
          type: "success",
        });
      }
      // in case of: adding new user
      else {
        dispatch(addUser(u));
        setToats({
          message: "User has been added successfully",
          type: "success",
        });
        setFullName("");
        setEmail("");
        setImageSrc("");
        setTelephone("");
        setBirthdate("");
        setAddress("");
        setJobTitle("");
        setDescription("");
        setNationality("");
      }
    } else {
      setToats({
        message:
          "Please fill in the necessary form inputs before submitting the form",
        type: "failure",
      });
    }
  };

  // for update: if this form has received data to be updated we will populate the inputs first
  useEffect(() => {
    if (userTobeUpdated) {
      setFullName(userTobeUpdated.Name);
      setEmail(userTobeUpdated.Email);
      setImageSrc(userTobeUpdated.Photo);
      setTelephone(userTobeUpdated.Telephone);

      // Convert the birthdate to YYYY-MM-DD format
      const birthdateFormatted = new Date(userTobeUpdated.Birthdate)
        .toISOString()
        .split("T")[0];
      setBirthdate(birthdateFormatted);

      setAddress(userTobeUpdated.Address);
      setJobTitle(userTobeUpdated.JobTitle);
      setDescription(userTobeUpdated.Description);
      setNationality(userTobeUpdated.Nationality);
      console.log("USER TO BE UPDATED HAS BEEN FILLED IN THE STATE ON RENDER"); // FIXME: a modal to show the error
    }
  }, [userTobeUpdated]);

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
      className="p-16 w-full flex flex-col items-center gap-6 bg-bg-light-2 dark:bg-bg-dark-2 dark:text-font-dark-1 text-font-light-1 rounded"
    >
      <div className="flex flex-col items-start gap-2 w-full relative ">
        <label className="" htmlFor="name">
          Full Name
        </label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          type="text"
          id="name"
          placeholder=""
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.fullName}
          </p>
        )}
      </div>
      <div className="flex flex-col items-start gap-2 w-full relative ">
        <label className="" htmlFor="email">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          placeholder=""
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.email && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.email}
          </p>
        )}
      </div>{" "}
      <div className="flex flex-col items-start gap-2 w-full relative">
        <label className="" htmlFor="birthdate">
          Birthdate
        </label>
        <input
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          type="date"
          name="birthdate"
          id="birthdate"
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.birthdate && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.birthdate}
          </p>
        )}
      </div>{" "}
      <div className="flex flex-col items-start gap-2 w-full relative">
        <label className="" htmlFor="tel">
          Telephone
        </label>
        <input
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          type="phone"
          name="tel"
          id="tel"
          placeholder=""
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.telephone && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.telephone}
          </p>
        )}
      </div>
      <div className="flex flex-col items-start gap-2 w-full relative">
        <label className="" htmlFor="address">
          Address
        </label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          name="address"
          id="address"
          placeholder=""
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.address && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.address}
          </p>
        )}
      </div>
      <div className="flex flex-col items-start gap-2 w-full relative">
        <label className="" htmlFor="nationality">
          Nationality
        </label>
        <input
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          type="text"
          name="nationality"
          id="nationality"
          placeholder=""
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.nationality && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.nationality}
          </p>
        )}
      </div>
      <div className="flex flex-col items-start gap-2 w-full relative">
        <label className="" htmlFor="jobtitle">
          Job Title
        </label>
        <input
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          type="text"
          name="jobtitle"
          id="jobtitle"
          placeholder=""
          className="p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.jobTitle}
          </p>
        )}
      </div>
      <div className="flex flex-col items-start gap-2 w-full relative">
        <label className="" htmlFor="desc">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder=""
          name="desc"
          id="desc"
          className="resize-none p-2 rounded w-full bg-bg-light-1 dark:bg-bg-dark-1"
          rows={6}
        />
        {errors.description && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.description}
          </p>
        )}
      </div>
      <div className="relative flex justify-between w-full">
        <input
          type="file"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-[130px]"
        />
        {errors.image && (
          <p className="text-red-500 text-sm absolute -bottom-6">
            {errors.image}
          </p>
        )}
        {imageSrc ? ( // 170px x 130px
          <div className="flex ">
            <img
              src={imageSrc}
              alt="Uploaded"
              style={{ maxWidth: "100%" }}
              className="w-[130px] h-[170px] rounded-lg"
            />
          </div>
        ) : (
          <div className="dark:bg-gray-600 bg-gray-300 w-[130px] h-[170px] rounded-lg flex justify-center items-center">
            <p className=""> upload image </p>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="p-2 bg-primary text-white rounded w-full"
      >
        {userTobeUpdated ? "Update user" : "Register User"}
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
export default PersonDetails;
