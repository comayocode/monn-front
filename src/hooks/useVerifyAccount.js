import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useCountdown from '@/hooks/useCountdown';
import useResendVerificationEmail from './useResendVerificationEmail';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';

const useVerifyAccount = () => {
  const { apiVerifyAccount } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { handleResendVerificationEmail } = useResendVerificationEmail();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [statusCode, setStatusCode] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');

  // contadores
  const { secondsLeft: expiryCountdown, start: startExpiryCountdown } = useCountdown();
  const { secondsLeft: resendCountdown, start: startResendCountdown } = useCountdown();

  // Función para verificar el token
  const verifyToken = async (token) => {
    setIsVerifying(true);
    try {
      const response = await apiVerifyAccount(token);
      console.log({ 'RESPUESTA BACKEND CON TOKEN': response });
      if (response.status === 200 || response.data?.status === 200) {
        setVerificationMessage('¡Listo! Te llevamos al login en un momento...');
        setStatusCode(200);
        localStorage.removeItem('pendingVerification');
        addToast(response.data?.message || 'Cuenta verificada exitosamente.', 'success');
        navigate(window.location.pathname, { replace: true });
        // Redirección automática después de X segundos
        setTimeout(() => {
          navigate('/login', {
            state: {
              verifiedEmail: email
            },
            replace: true // Evitar volver atrás
          });
        }, 4000);

        return;
      }

      setVerificationMessage(response.data?.message || 'Error al verificar la cuenta');
      setStatusCode(response.status || 500);
      addToast(response.data?.message || 'Error al verificar la cuenta', 'error');

    } catch (error) {
      console.error({ 'Error al verificar': error });
      const errorMessage = error.response?.data?.message ||
        error.message ||
        'Enlace expirado, por favor envía un nuevo link para verificar tu cuenta';

      setVerificationMessage(errorMessage);
      setStatusCode(error.response?.status || 404);
      addToast(errorMessage, 'error');
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('pendingVerification'));
    const token = searchParams.get('token');

    if (isVerifying || statusCode === 200) return; // Evitar múltiples verificaciones

    if (token) {
      verifyToken(token);
      return;
    }

    if (!savedData?.email) {
      navigate('/login');
      return;
    }

    const isExpired = savedData.timestamp && new Date() - new Date(savedData.timestamp) > 86400000;

    if (isExpired) {
      localStorage.removeItem('pendingVerification');
      navigate('/login');
      return;
    }

    setEmail(savedData.email || '');
    setStatusCode(savedData.statusCode || 403);

    if (savedData.expiresAt) {
      const expiresIn = Math.floor((new Date(savedData.expiresAt) - new Date()) / 1000);
      startExpiryCountdown(Math.max(0, expiresIn));
    }

    startResendCountdown(savedData.statusCode === 500 ? 0 : 120);
  }, [navigate, startExpiryCountdown, startResendCountdown, searchParams]);

  const handleResend = async () => {
    try {
      const response = await handleResendVerificationEmail({ email });
      if (response?.data?.expiresAt) {
        const newState = {
          email,
          statusCode: 403,
          expiresAt: response.data.expiresAt,
          lastUpdated: new Date().toISOString(),
        };

        localStorage.setItem('pendingVerification', JSON.stringify(newState));
        setStatusCode(403);
        startExpiryCountdown(Math.floor((new Date(response.data.expiresAt) - new Date()) / 1000));
        startResendCountdown(120);
      }
    } catch (error) {
      console.error('Error al enviar...', error);
    }
  };


  // Determinar el título basado en el estado
  const getTitle = () => {
    if (isVerifying) return 'Verificando tu cuenta...';
    switch (statusCode) {
      case 403:
        return 'Verifica tu cuenta';
      case 200:
        return '¡Cuenta verificada!';
      case 404:
        return 'Enlace inválido';
      case 500:
        return 'Enlace expirado';
      default:
        return 'Verificación de cuenta';
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [
      hours.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0'),
    ].join(':');
  };

  return {
    email,
    statusCode,
    expiryCountdown,
    resendCountdown,
    handleResend,
    formatTime,
    navigate,
    isVerifying,
    verificationMessage,
    getTitle,
  };
};

export default useVerifyAccount;