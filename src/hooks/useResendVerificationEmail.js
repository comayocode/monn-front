import useToast from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';

const useResendVerificationEmail = () => {
  const { apiResendVerificationEmail } = useAuth();
  const { addToast } = useToast();

  const handleResendVerificationEmail = async (formData) => {
    try {
      const { email } = formData;
      const response = await apiResendVerificationEmail(email);
      console.log({response});
      addToast(response.message, 'success');
      return response;
    } catch (error) {
      return error;
    }
  }

  return { handleResendVerificationEmail }
}

export default useResendVerificationEmail;