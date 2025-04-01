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
      const {email, password} = formData;
      const response = await authenticateUser(email, password);
      console.log('Respuesta del backend:', response);
      if (response?.status === 200) {
        addToast('Ingreso exitoso.', 'success');
        navigate('/admin/dashboard')
      } else if (response?.expiresAt) {
        // Verifica si `expiresAt` existe
        localStorage.setItem('tempEmail', email);
        navigate('/2fa');
      } else if (response?.accessToken) {
        // Verifica si el token existe
        localStorage.setItem('token', response.accessToken);
        setUser(getUserFromToken());
        navigate('/admin/dashboard');
      } else {
        addToast(response.message || 'Error inesperado.', 'error');
      }

    } catch (error) {
      addToast('Error al restablecer la contraseña.', 'error', error);
    }
  };

  return { handleLoginUser };
};

export default useLogin;
