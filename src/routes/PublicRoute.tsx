import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsAuthenticated } from "../features/auth/authSelectors";
import { useSelector } from "react-redux";

interface PublicRouteProps {
  restricted?: boolean;
}

export const PublicRoute: FC<PublicRouteProps> = ({ restricted = false }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated && restricted) {
    return <Navigate to="/"  replace />;
  }

  return <Outlet />;
};
