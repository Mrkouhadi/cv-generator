import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="bg-black fixed top-0 left-36 right-0 bottom-0 bg-black bg-opacity-80">
      <button
        onClick={onClose}
        className="bg-white w-10 h-10 rounded-full rounded text-red-600 absolute z-99 top-1 left-1 text-3xl"
      >
        X
      </button>
      <div className="overflow-y-auto h-screen p-12">{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
