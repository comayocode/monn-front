import { useState } from 'react';
import '@/styles/auth.css'
import useAuth from '@/hooks/useAuth';
import Button from '@/components/ui/Button/Button';
import ForgotPasswordForm from '@/pages/Login/components/ForgotPasswordForm';
import Modal from '@/components/ui/Modal/Modal';
import LoginForm from './components/LoginForm';
import useLogin from '../../hooks/useLogin';

function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleForgotPassword } = useAuth();
  const {handleLoginUser} = useLogin();

  return (
    <div className='auth'>
      <div className="auth__form-container">
      <h2 className='auth__title'>Iniciar Sesión</h2>
      <p className='auth__description'>Ingresa tus credenciales para continuar.</p>
      <LoginForm
          onSubmit={handleLoginUser}
          initialValues={{ email: '', password: '' }}
          submitText='Ingresar'
          btnMarginTop={25}
      >
        <Button
          variant='link'
          className='login__forgot-password'
          onClick={() => setIsModalOpen(true)}
          type='button'
        >
          ¿Olvidaste tu contraseña?
        </Button>
      </LoginForm>
      </div>

      <Button
          variant='link'
          className='login__signup-btn'
          isLink={true}
          to='/signup'
        >
          ¿No tienes una cuenta? Regístrate
        </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Recuperar contraseña'
        description='Ingresa tu correo electrónico para recuperar tu contraseña.'
        variant='confirmation'
        actions={[]}
      >
        <ForgotPasswordForm
          initialValues={{ email: '' }}
          onSubmit={handleForgotPassword}
          submitText={'Recuperar correo'}
        />
      </Modal>
    </div>
  );
}

export default Login;
