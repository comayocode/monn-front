import { useState } from 'react';
import useToast from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { verify2FA, getUserFromToken } from '@/api/auth';
import useAuth from '@/hooks/useAuth';


const useTwoFactor = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useAuth();

  const handleVerify = async (values) => {
    setLoading(true);
    setError('');

    try {
      const email = localStorage.getItem('tempEmail');
      const response = await verify2FA(email, values.code, values.rememberDevice);

      if (response?.status === 200) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.removeItem('tempEmail');

        addToast('Código verificado correctamente.', 'success');
        setUser(getUserFromToken()); // Actualizar el usuario en el contexto
        navigate('/admin/dashboard');
      } else {
        setError(response.data?.message || 'Código incorrecto');
        addToast(response.data?.message || 'Código incorrecto', 'error');
      }
    } catch (error) {
      setError('Error al verificar el código 2FA');
      addToast('Error al verificar el código 2FA', 'error');
      console.error('Error al verificar 2FA:', error);
    } finally {
      setLoading(false);
    }
  };

  return { handleVerify, loading, error };
};

export default useTwoFactor;
