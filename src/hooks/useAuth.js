import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { user, setUser, authenticateUser, logout, handleForgotPassword } = useContext(AuthContext);
  return { user, setUser, authenticateUser, logout, handleForgotPassword };
};

export default useAuth;
