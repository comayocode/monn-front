import api from '@/api/myApi';
import useToast from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';

const useResetPassword = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const resetPassword = async (values, token) => {

    if (!token) {
      addToast('Token no válido.', 'error');
      return;
    }

    if (values.password !== values.confirmPassword) {
      addToast('Las contraseñas no coinciden.', 'error');
      return;
    }

    try {
      const response = await api.post('/auth/reset-password', {
        token,
        newPassword: values.password,
      });

      if (response?.status === 200) {
        addToast('Contraseña restablecida con éxito.', 'success');
        navigate('/login')
        addToast('Ya puedes cerrar la otra ventana.', 'info')
      } else {
        addToast(response.message || 'Error inesperado.', 'error');
      }
    } catch (error) {
      addToast('Error al restablecer la contraseña.', 'error', error);
    }
  };

  return { resetPassword };
};

export default useResetPassword;
