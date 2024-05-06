import React, { useEffect, useState } from "react";

interface ToastProps {
  children: React.ReactNode;
  type: string;
}

const Toast: React.FC<ToastProps> = ({ children, type }) => {
  const toastBackgroundColor =
    type === "success" ? "bg-green-500" : "bg-red-500";
  return (
    <div
      className={`fixed bottom-4 right-4 rounded-md text-white ${toastBackgroundColor}`}
    >
      {children}
    </div>
  );
};
export default Toast;
