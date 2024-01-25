import React from "react";
import { useAuth } from "./AuthContext";
import LoginRequiredModal from "./components/Modals/LoginRequiredModal";

export const ProtectedRoute = ({ children }) => {
  const { user_id } = useAuth();
  
  const showLoginModal = !user_id;

  return showLoginModal ? (
    <LoginRequiredModal showModal={showLoginModal}/>
  ) : (
    <>{children}</>
  );
};
