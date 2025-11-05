import React from "react";

export default function Modal({ id, title, children, onClose, isOpen }) {
  return (
    <dialog
      id={id}
      className="modal"
      open={isOpen ? true : undefined}
      onClose={onClose}
    >
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-lg text-center">{title}</h3>
          <div className="py-4">{children}</div>
        </form>
      </div>
    </dialog>
  );
}
