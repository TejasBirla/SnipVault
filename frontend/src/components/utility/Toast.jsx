import React, { useEffect } from "react";

export default function Toast({ message, status, show, setShow }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 3000); // hide after 3s
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  if (!show || !message) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div className="toast">
        <div className={`alert ${status ? "alert-success" : "alert-error"}`}>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}
