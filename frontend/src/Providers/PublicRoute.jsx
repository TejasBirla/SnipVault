import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";

export default function PublicRoute({ children }) {
  const { authUser } = useContext(AuthContext);

  // If logged in, block access to login/signup and redirect
  if (authUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
