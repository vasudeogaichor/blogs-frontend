import React from "react";
import { useAuth } from "./AuthContext";
import LoginRequiredModal from "./components/Modals/LoginRequiredModal";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  const showLoginModal = !user;

  return showLoginModal ? (
    <LoginRequiredModal showModal={showLoginModal}/>
  ) : (
    <>{children}</>
  );
};
