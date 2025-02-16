import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(UserContext);

  if (login === true) {
    return children;
  } else if (login === false) {
    return <Navigate to="/login" />;
  } else {
    return <></>;
  }
};

export default ProtectedRoute;
