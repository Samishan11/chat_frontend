import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../service/token";

export const Protected = () => {
  const user = getToken();
  if (user) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};
