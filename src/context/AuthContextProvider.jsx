import { useState } from 'react';
import PropTypes from 'prop-types';
import { apiLogin, getUserFromToken, requestPasswordReset, apiSignUp, apiResendVerificationEmail, apiVerifyAccount } from '@/api/auth';
import { AuthContext } from '@/context/AuthContext';
import useToast from '@/hooks/useToast';

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState(getUserFromToken()); // Cargamos usuario desde el token

  const authenticateUser = async (email, password) => {
    const result = await apiLogin(email, password);
    if (result.success) {
      const userData = getUserFromToken(); // Decodificamos el token
      setUser(userData); // Guardamos el usuario en el estado
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Borramos solo el token
  };

  const handleForgotPassword = async (email) => {
    try {
      const response = await requestPasswordReset(email);

      console.log('Respuesta del servidor:', response); // 🛠 Debug
      console.log(response?.status);
      if (response.status === 200) {
        // Verificamos el código de estado
        console.log({response});
        addToast(
          response.data,
          'success'
        );
      } else {
        addToast(
          response?.message || 'Hubo un problema, intenta nuevamente.',
          'error'
        );
      }
    } catch (error) {
      console.error('Error en recuperación de contraseña:', error);
      addToast('Error al enviar el correo de recuperación.', 'error');
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, authenticateUser, logout, handleForgotPassword, apiSignUp, apiResendVerificationEmail, apiVerifyAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
