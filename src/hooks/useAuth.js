import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { user, setUser, authenticateUser, logout, handleForgotPassword, apiSignUp, apiResendVerificationEmail, apiVerifyAccount } = useContext(AuthContext);
  return { user, setUser, authenticateUser, logout, handleForgotPassword, apiSignUp, apiResendVerificationEmail, apiVerifyAccount };
};

export default useAuth;
