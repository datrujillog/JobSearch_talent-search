import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth/authContext";

export const GenericRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { role } = user;
  return role === "USER" || role === "EMPLOYER" ? (
    children
  ) : (
    <Navigate to="/admin-user" />
  );
};
