import TwoFactorForm from './components/TwoFactorForm';
import './TwoFactorAuth.css';
import useTwoFactor from '@/hooks/useTwoFactor';
import { useState, useEffect } from 'react';
import { useMemo } from 'react';

const Verify2FA = () => {
  const { handleVerify, loading } = useTwoFactor();
  const [expiresAt, setExpiresAt] = useState(null); // Fecha de expiración desde la API
  const [codeTimer, setCodeTimer] = useState(0); // Contador de expiración del código
  const [resendTimer, setResendTimer] = useState(30); // Contador para reenviar código
  const [canResend, setCanResend] = useState(false);

  const email = localStorage.getItem('tempEmail'); // Obtenemos el email desde el estado

  // Memoizar el initialValues
  const initialValues = useMemo(() => ({
    email: localStorage.getItem('tempEmail'),
    code: '',
    rememberDevice: false
  }), []);

  // Calcular la diferencia de tiempo en segundos
  const calculateTimeRemaining = (expirationTime) => {
    const now = new Date().getTime();
    const expires = new Date(expirationTime).getTime();
    return Math.max(Math.floor((expires - now) / 1000), 0); // Evita valores negativos
  };

  // Convertir segundos en formato MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // Obtener `expiresAt` de la API (debe ejecutarse después del login)
  useEffect(() => {
    const storedExpiresAt = localStorage.getItem('expiresAt');
    if (storedExpiresAt) {
      setExpiresAt(storedExpiresAt);
      setCodeTimer(calculateTimeRemaining(storedExpiresAt));
    }
  }, []);

  // Temporizador para la expiración del código
  useEffect(() => {
    if (codeTimer > 0) {
      const timer = setTimeout(() => setCodeTimer(codeTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [codeTimer]);

  // Temporizador para habilitar el reenvío del código
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Función para reenviar el código
  const handleResendCode = () => {
    setResendTimer(30); // Reiniciar el contador
    setCanResend(false);
    // Aquí puedes llamar a tu API para reenviar el código
    console.log('Código reenviado a:', email);
  };

  return (
    <div className='verify-2fa'>
      <div className='verify-2fa_card'>
        <h2 className='verify-2fa__title'>Autenticación</h2>
        <p className='verify-2fa__subtitle'>
          Ingresa el código de 6 dígitos que enviamos a tu correo {email}
        </p>
        <p className='verify-2fa__timer'>
          {codeTimer > 0 ? (
            <>
              <span className='code-2fa__timer--text'>Tiempo restante</span>
              <strong className='code-2fa__timer--code'>{formatTime(codeTimer)}</strong>
            </>
          ) : (
            <strong className='code-2fa__timer--expired'>Código expirado</strong>
          )}
        </p>
        <TwoFactorForm
          initialValues={initialValues}
          onSubmit={handleVerify}
          submitText={loading ? 'Verificando...' : 'Verificar'}
        />
        <button
          className='verify-2fa__resend'
          onClick={handleResendCode}
          disabled={!canResend}
        >
          {canResend ? 'Reenviar código' : `Reenviar en ${resendTimer}s`}
        </button>
      </div>
    </div>
  );
};

export default Verify2FA;
