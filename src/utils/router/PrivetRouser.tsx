import React from "react";
import { useAuth } from "../hook";
import { Outlet, Navigate } from "react-router-dom";

const PrivetRouser = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivetRouser;
