// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "@/contexts/user_context_provider";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

const ProtectedRoutes: React.FC = () => {
  // const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userState, loading } = useUser();
  // const navigate = useNavigate();
  // const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = userState.loggedInStatus === "LOGGED_IN";

  if (!isAuthenticated) {
    // Pass the current location to the login page via state
    return <Navigate to="/" />;
    // return <Navigate to="/" state={{ from: location }} replace />;
    // navigate("/");
  }

  return <Outlet />;
};

export default ProtectedRoutes;
