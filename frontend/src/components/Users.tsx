import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser, selectAllUsers } from "../state/UserSlice";
import { RootState, AppDispatch } from "../state/store"; // Import RootState if you have it defined in your Redux store

import { User } from "../utils/types";
import PersonDetails from "./forms/PersonDetails";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
const newUser: User = {
  Name: "",
  Email: "",
  Photo: "",
  Birthdate: new Date(""),
  Telephone: "",
  Address: "",
  Nationality: "",
  JobTitle: "",
  Description: "",
};
function Users() {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => selectAllUsers(state));
  const [openUpdate, setOpenupdate] = useState({ open: false, data: newUser });

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId: number, file: string) => {
    dispatch(deleteUser({ UserId: userId, File: file }));
  };
  return (
    <div className="h-screen w-full">
      <h1>Users</h1>
      <div className="grid grid-cols-3 gap-2">
        {users.map((user) => (
          <div className="min-h-44 bg-bg-light-1 dark:bg-bg-dark-2 shadow hover:shadow-xl flex flex-col justify-between">
            <div key={user.ID} className=" p-2 text-start flex flex-col gap-2">
              <h1 className="">
                Name:{" "}
                <span className="font-bold">
                  {user.Name.length > 20
                    ? user.Name.substring(0, 20) + "..."
                    : user.Name}
                </span>
              </h1>
              <h1 className="">
                Job Title:
                <span className="font-bold">
                  {user.JobTitle.length > 20
                    ? user.JobTitle.substring(0, 20) + "..."
                    : user.JobTitle}
                </span>{" "}
              </h1>
              <h1 className="">
                Email:
                <span className="font-bold">
                  {user.Email.length > 20
                    ? user.Email.substring(0, 20) + "..."
                    : user.Email}
                </span>{" "}
              </h1>
              <h1 className="">
                Email:
                <span className="font-bold">
                  {user.Email.length > 20
                    ? user.Email.substring(0, 20) + "..."
                    : user.Email}
                </span>{" "}
              </h1>
            </div>

            <div className="flex items-center justify-between bg-white p-2">
              <Link
                to={`/user/${user.ID}`}
                className="bg-primary text-white py-2 px-4"
              >
                View
              </Link>
              <button
                onClick={() =>
                  setOpenupdate({ open: !openUpdate.open, data: user })
                }
              >
                <PencilSquareIcon className="w-6 h-6 text-green-800" />
              </button>
              <button onClick={() => handleDeleteUser(user.ID!, user.Photo)}>
                <TrashIcon className="w-6 h-6 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {openUpdate.open && <PersonDetails userTobeUpdated={openUpdate.data} />}
    </div>
  );
}
export default Users;
