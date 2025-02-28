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
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(username, password);
    console.log(result);
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
        <p className='login__description'>Ingresa tus credenciales para continuar.</p>
        <Input
          label='Usuario'
          placeholder='mi.usuario@correo.com'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label='Contraseña'
          placeholder='••••••••••••'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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