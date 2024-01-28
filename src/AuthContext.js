import { createContext, useEffect, useContext, useMemo, useCallback } from "react";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { removeLocalUser, getCookie } from "./libs/localUserUtils";
import { validateUserToken } from "./apis/users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const storedToken = getCookie('token');

  useEffect(() => {
    validateUserToken(storedToken)
      .then(res => {
        if (res?.data?.userId) {
          login(res.data);
        } else {
          clearUserData();
        }
      })
      .catch(error => {
        clearUserData();
      });
  }, []);

  const clearUserData = useCallback(() => {
    setUser(null);
    removeLocalUser();
  }, [setUser]);

  // save user info to local storage
  const login = useCallback(async (data) => {
    setUser({
      userId: data.userId,
      username: data.username,
      email: data.email,
    });
  }, [setUser]);

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setUser(null);
    removeLocalUser();
  }, [setUser]);

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