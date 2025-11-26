import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { authUser } = useContext(AuthContext);

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
