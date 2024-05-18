import { useState } from "react";
import { User } from "../../utils/types";
import PersonDetails from "../forms/PersonDetails";
import { Link } from "react-router-dom";
import { deleteUser } from "../../state/UserSlice";
import { AppDispatch } from "../../state/store"; // Import RootState if you have it defined in your Redux store
import { useDispatch } from "react-redux";
import Modal from "../Modal";

type UserCardProps = {
  user: User;
};
const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleDeleteUser = (userId: number, file: string) => {
    dispatch(deleteUser({ UserId: userId, File: file }));
  };

  // Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div
      key={user.ID}
      className="bg-bg-light-1 dark:bg-bg-dark-2 shadow hover:shadow-xl flex flex-col justify-between rounded overflow-hidden"
    >
      <Link
        key={user.ID}
        className=" p-2 text-start flex flex-col gap-2"
        to={`/user/${user.ID}`}
      >
        <img
          src={"http://localhost:34115/" + user.Photo}
          alt={user.Name + " Profile Photo"}
          className="h-80 w-full rounded"
        />
        <h1 className="">
          Name:{" "}
          <span className="font-bold">
            {user.Name.length > 20
              ? user.Name.substring(0, 20) + "..."
              : user.Name}
          </span>
        </h1>
        <h1 className="">
          Birthdate:{" "}
          <span className="font-bold">
            {
              typeof user.Birthdate === "string" // Check if Birthdate is a string
                ? (user.Birthdate as string).substring(0, 10) // Use substring method on strings
                : user.Birthdate instanceof Date // Check if Birthdate is a Date object
                ? user.Birthdate.toLocaleDateString().substring(0, 10) // Format Date object into a string and use substring method
                : "Unknown" // Handle other types or unexpected values
            }
          </span>
        </h1>
        <h1 className="">
          Job Title:{" "}
          <span className="font-bold">
            {user.JobTitle.length > 20
              ? user.JobTitle.substring(0, 20) + "..."
              : user.JobTitle}
          </span>{" "}
        </h1>
        <h1 className="">
          Email:{" "}
          <span className="font-bold">
            {user.Email.length > 20
              ? user.Email.substring(0, 20) + "..."
              : user.Email}
          </span>{" "}
        </h1>
      </Link>
      <div className="flex items-center justify-between  p-2">
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={() => handleDeleteUser(user.ID!, user.Photo)}
        >
          Delete
        </button>
        <button
          className="bg-green-700 text-white p-2 px-4 rounded"
          onClick={handleOpen}
        >
          Edit
        </button>
      </div>
      <Modal show={showModal} onClose={handleClose}>
        <PersonDetails userTobeUpdated={user} />
      </Modal>
    </div>
  );
};

export default UserCard;
