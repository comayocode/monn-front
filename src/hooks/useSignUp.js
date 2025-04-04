import useToast from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const useSignUp = () => {
  const { apiSignUp } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (formData) => {

    try {
      const { firstName, lastName, email, password } = formData;
      const response = await apiSignUp(firstName, lastName, email, password);
      addToast(response.message, 'success');
      navigate('/login');
    } catch (error) {
      if (error.status == 400 && error.data) {
        Object.entries(error.data).forEach(([field, message]) => {
          addToast(message, 'error');
        });
      }else {
        addToast(error.message || 'Error al registrar', 'error');
      }
    }
  }

  return { handleSignUp }
}

export default useSignUp;