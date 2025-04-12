import PropTypes from 'prop-types';
import './VerificationContent.css';
import Button from '@/components/ui/Button/Button';

const VerificationContent = ({
  statusCode = 403,
  email = '',
  expiryCountdown = 0,
  resendCountdown = 0,
  handleResend = () => {},
  formatTime = (s) => s.toString(),
  navigate,
  isVerifying,
  verificationMessage,
  children,
}) => {
  console.log({ isVerifying, verificationMessage });

  // Mostrar estado de verificación si está procesando
  if (isVerifying) {
    return (
      <div className='auth'>
        <div className='auth_form-container'>
          <h2 className='auth__title'>Verificando tu cuenta...</h2>
        </div>
      </div>
    );
  }

  // Mostrar mensajes de éxito/error después de verificación
  if (statusCode === 200 || statusCode === 404) {
    return (
      <>
        <p className='auth__description'>{verificationMessage}</p>
        <div className='verify-account__footer'>
          <Button onClick={() => navigate('/')} size='small' fullWidth>
            Ir al inicio de sesión
          </Button>
          <div className='verify-account__progress'>
            <div className='verify-account__progress-bar' />
          </div>
        </div>
      </>
    );
  }

  // Vista para 403 (contador activo)
  if (statusCode === 403) {
    return (
      <div className='auth_form-container'>
        <p className='auth__description'>
          Hemos enviado un correo a{' '}
          <strong className='verify-account__email'>{email}</strong>.
        </p>
        <p className='auth__description'>
          Tiempo restante:{' '}
          <strong className='auth__timer'>{formatTime(expiryCountdown)}</strong>
        </p>
        <Button
          onClick={handleResend}
          disabled={resendCountdown > 0}
          size='small'
          fullWidth
        >
          {resendCountdown > 0
            ? `Reenviar en ${formatTime(resendCountdown)}`
            : 'No recibí el correo'}
        </Button>
        {children}
      </div>
    );
  }

  // Vista para 500 (token expirado)
  if (statusCode === 500) {
    return (
      <div className='auth_form-container'>
        <p className='auth__description'>
          El enlace de verificación para{' '}
          <strong className='verify-account__email'>{email}</strong> ha
          expirado.
        </p>
        <Button onClick={handleResend} size='small' fullWidth>
          Obtener nuevo enlace
        </Button>
        {children}
      </div>
    );
  }

  return null;
};

VerificationContent.propTypes = {
  statusCode: PropTypes.number,
  email: PropTypes.string,
  expiryCountdown: PropTypes.number,
  resendCountdown: PropTypes.number,
  handleResend: PropTypes.func,
  formatTime: PropTypes.func,
  isVerifying: PropTypes.bool,
  navigate: PropTypes.func,
  verificationMessage: PropTypes.string,
  children: PropTypes.node,
};

export default VerificationContent;
