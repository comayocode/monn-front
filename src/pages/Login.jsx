import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate para la redirección
import { login } from '../services/authService'; // Importamos el servicio de login

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Usamos useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(username, password);

    if (response.success) {
      navigate('/admin'); // Redirigimos al Panel de Administración si el login es exitoso
    } else {
      setError(response.message); // Mostramos un mensaje de error si las credenciales son incorrectas
    }
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
