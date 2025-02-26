import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import useAuth from '@/context/useAuth';
import Button from '@/components/ui/Button';

function Login() {
  const [isFocused, setFocusState] = useState({
    username: false,
    password: false,
  });
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
      <h2 className='login__title'>Iniciar Sesión</h2>
      <form className='login__form' onSubmit={handleLogin}>
        <div className='login__input-group'>
          <label
            className={`login__input-label ${
              isFocused.username ? 'focused' : ''
            }`}
          >
            Usuario
          </label>
          <input
            className='login__input'
            type='text'
            placeholder='Escribe tu nombre de usuario'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() =>
              setFocusState((prev) => ({ ...prev, username: true }))
            }
            onBlur={() =>
              setFocusState((prev) => ({ ...prev, username: false }))
            }
            required
          />
        </div>
        <div className='login__input-group'>
          <label
            className={`login__input-label ${
              isFocused.password ? 'focused' : ''
            }`}
          >
            Contraseña
          </label>
          <input
            className='login__input'
            type='password'
            placeholder='Escribe tu contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() =>
              setFocusState((prev) => ({ ...prev, password: true }))
            }
            onBlur={() =>
              setFocusState((prev) => ({ ...prev, password: false }))
            }
            required
          />
        </div>
        <Button type='submit' variant='primary' size='normal' fullWidth>
          Iniciar Sesión
        </Button>
      </form>
      <div className='login__message'>
        {error && <p className='login__error'>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
