import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';

function Login() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [emptyFields, setEmptyFields] = useState({
    username: false,
    password: false,
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false); // Reiniciamos error general

    const newEmptyFields = {
      username: !username.trim(),
      password: !password.trim(),
    };
    setEmptyFields(newEmptyFields);

    if (newEmptyFields.username || newEmptyFields.password) {
      addToast('Por favor, completa todos los campos.', 'error');
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      addToast(`Ingreso exitoso ¡Bienvenid@ ${username}!`, 'success');
      navigate('/admin/dashboard');
    } else {
      setError(true); // Marcar error en los inputs
      addToast('Credenciales inválidas, intenta nuevamente.', 'error');
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
          onChange={(e) => {
            setUsername(e.target.value);
            if (error) setError(false); // Quita el borde rojo si hay cambios
            if (emptyFields.username) setEmptyFields({ ...emptyFields, username: false });
          }}
          error={error || emptyFields.username}
        />
        <Input
          label='Contraseña'
          placeholder='••••••••••••'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError(false);
            if (emptyFields.password) setEmptyFields({ ...emptyFields, password: false });
          }}
          error={error || emptyFields.password}
          variant='password'
        />
        <Button type='submit' variant='primary' size='normal' fullWidth>
          Ingresar
        </Button>
      </form>
    </div>
  );
}

export default Login;
