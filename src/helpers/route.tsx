import { Navigate } from "react-router-dom";
import { useContext, ReactNode } from "react";
import { AuthContext } from "./authContext";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { authToken } = useContext(AuthContext);

  return authToken ? <>{children}</> : <Navigate to="/masuk" />;
};

export const RestrictedRoute = ({ children }: PrivateRouteProps) => {
  const { authToken } = useContext(AuthContext);
  return !authToken ? <>{children}</>: <Navigate to="/" />;
};
