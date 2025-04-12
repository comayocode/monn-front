import useVerifyAccount from '@/hooks/useVerifyAccount';
import VerificationContent from './components/VerificationContent';
import '@/styles/auth.css';
import Button from '@/components/ui/Button/Button';

const VerifyAccount = () => {
  const {
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
  } = useVerifyAccount();

  return (
    <div className='auth'>
      <div className='auth__form-container'>
        <h2 className='auth__title'>{getTitle()}</h2>

        <VerificationContent
          title={getTitle()}
          statusCode={statusCode}
          email={email}
          expiryCountdown={expiryCountdown}
          resendCountdown={resendCountdown}
          handleResend={handleResend}
          formatTime={formatTime}
          navigate={navigate}
          isVerifying={isVerifying}
          verificationMessage={verificationMessage}
        />
      </div>
      {!isVerifying && !verificationMessage && (
        <Button to={'/login'} size='medium' variant='link' isLink>
          Volver al inicio de sesión
        </Button>
      )}
    </div>
  );
};

export default VerifyAccount;
