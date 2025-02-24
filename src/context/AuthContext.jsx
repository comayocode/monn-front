import { useState } from "react";
import PropTypes from "prop-types";
import { loginUser } from "@/api/auth";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const login = async (username, password) => {
    const result = await loginUser(username, password);
    if (result.success) {
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
