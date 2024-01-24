import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user_id } = useAuth();
  
  if (!user_id) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
