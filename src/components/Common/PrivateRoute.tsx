import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const PrivateRoute = (props: RouteProps) => {
  const accessToken = Boolean(localStorage.getItem("access_token"));
  if (!accessToken) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default PrivateRoute;
