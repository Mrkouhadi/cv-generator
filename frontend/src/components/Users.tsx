import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, selectAllUsers } from "../state/UserSlice";
import { RootState, AppDispatch } from "../state/store";

import UserCard from "./cards/UserCard";
import PersonDetails from "./forms/PersonDetails";
import Modal from "./Modal";

const Users: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => selectAllUsers(state));

  // Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
  };
  // refetch users to make sure the page is updated
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [showModal]);

  return (
    <div className="pb-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-widest my-4">Users:</h1>
        <button
          className="p-2 bg-primary text-white rounded"
          onClick={handleOpen}
        >
          Add New User
        </button>
      </div>
      <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
        {users && users.map((user) => <UserCard key={user.ID} user={user} />)}
      </div>
      <Modal show={showModal} onClose={handleClose}>
        <PersonDetails />
      </Modal>
    </div>
  );
};
export default Users;
