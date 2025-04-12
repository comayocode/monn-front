import useToast from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { getUserFromToken } from '@/api/auth';

const useLogin = () => {
  const { authenticateUser } = useAuth();
  const { setUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLoginUser = async (formData) => {
    try {
      const { email, password } = formData;
      const response = await authenticateUser(email, password);
      // Login exitoso (con token)
      if (response?.accessToken) {
        localStorage.setItem('token', response.accessToken);
        setUser(getUserFromToken());
        addToast('Ingreso exitoso.', 'success');
        navigate('/admin/dashboard');
        return;
      }
      // Requiere 2FA
      if (response?.expiresAt) {
        localStorage.setItem('tempEmail', email);
        navigate('/2fa');
        return;
      }
      addToast(response?.message || 'Error inesperado.', 'error');

    } catch (error) {
      console.log({ error });
      // Cuenta no verificada con token expirado y/o con token activo
      if (error?.status === 403 && error.response?.data?.data?.email || error?.status === 500) {
        const { email, expiresAt } = error.response.data.data;
        const statusCode = error.response.status;
        localStorage.setItem('pendingVerification', JSON.stringify({ email, expiresAt, statusCode, lastUpdated: new Date().toISOString() }));
        navigate('/verify-account-pending');
        return;
      }
      // Otros errores
      addToast(
        error.response?.data?.message ||
        'Error al iniciar sesión. Intenta nuevamente.',
        'error'
      );
    }
  };

  return { handleLoginUser };
};

export default useLogin;
