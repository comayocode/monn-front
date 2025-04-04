import '@/styles/auth.css';
import SignUpForm from './components/SignUpForm';
import useSignUp from '../../hooks/useSignUp';

function SignUp() {
  const { handleSignUp } = useSignUp();

  return (
    <div className='auth'>
      <div className='auth__form-container'>
        <h2 className='auth__title'>Crear cuenta</h2>
        <p className='auth__description'>Completa los campos para continuar.</p>
        <SignUpForm
          onSubmit={handleSignUp}
          initialValues={{
            firsName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          submitText='Comenzar'
          btnMarginTop={25}
        />
      </div>
    </div>
  );
}

export default SignUp;
