import { useSearchParams } from 'react-router-dom';
import ResetPasswordForm from '@/pages/ResetPassword/components/ResetPasswordForm';
import useResetPassword from '@/hooks/useResetPassword';
import '@/styles/auth.css'

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { resetPassword } = useResetPassword();

  return (
    <div className='auth'>
      <div className='auth__form-container'>
        <h2 className='auth__title'>Restablecer cuenta</h2>
        <p className='auth__description'>Crea una contraseña nueva y repítela para confirmar.</p>
        <ResetPasswordForm
          onSubmit={resetPassword}
          token={token}
          initialValues={{ password: '', confirmPassword: '' }}
          submitText='Guardar nueva contraseña'
        />
      </div>
    </div>
  );
};

export default ResetPassword;
