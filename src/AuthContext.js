import { createContext, useContext, useMemo } from "react";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { removeLocalUser } from "./libs/localUserUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  // save user info to local storage
  const login = async (data) => {
    setUser({
      userId: data.userId,
      username: data.username,
      email: data.email,
    })
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    removeLocalUser();
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};