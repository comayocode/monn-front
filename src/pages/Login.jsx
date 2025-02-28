import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import useAuth from '@/context/useAuth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [prevValues, setPrevValues] = useState({ username: '', password: '' }); // Guardar los valores antes de hacer login
  const [emptyFields, setEmptyFields] = useState({
    username: false,
    password: false,
  }); // Rastrear qué campos están vacíos en el último intento
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const newEmptyFields = {
      username: !username.trim(),
      password: !password.trim(),
    }; // Detectar qué campos están vacíos
    setEmptyFields(newEmptyFields);

    if (newEmptyFields.username || newEmptyFields.password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setPrevValues({ username, password }); // Guardamos los valores ingresados antes del intento

    const result = await login(username, password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className='login'>
      <form className='login__form' onSubmit={handleLogin}>
        <h2 className='login__title'>Iniciar Sesión</h2>
        <p className='login__description'>
          Ingresa tus credenciales para continuar.
        </p>
        <Input
          label='Usuario'
          placeholder='mi.usuario@correo.com'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={
            (!!error && username === prevValues.username) ||
            emptyFields.username
          }
        />
        <Input
          label='Contraseña'
          placeholder='••••••••••••'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={
            (!!error && password === prevValues.password) ||
            emptyFields.password
          }
          variant='password'
        />
        <Button type='submit' variant='primary' size='normal' fullWidth>
          Ingresar
        </Button>
      </form>
      <div className='login__message'>
        {error && <p className='login__error'>{error}</p>}
      </div>
    </div>
  );
}

export default Login;