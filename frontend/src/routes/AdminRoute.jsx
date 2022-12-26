import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth/authContext";

export const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { role } = user;
  return role === "ADMIN" ? children : <Navigate to="/offers" />;
};
