import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  {/* If user not authenticated then redirect to login page
      Else return all the children elements 
  */}
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;