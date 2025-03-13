import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { user, setUser, login, logout } = useContext(AuthContext);
  return { user, setUser, login, logout };
};

export default useAuth;
