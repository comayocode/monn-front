import axios from 'axios';

// URL del servidor JSON simulado
const API_URL = 'http://localhost:5000/users';

// Login del usuario
export const login = async (username, password) => {
  try {
    // Realizamos una solicitud GET a la API simulada para buscar el usuario
    const response = await axios.get(API_URL, {
      params: { username, password }, // Enviamos el usuario y la contraseña como parámetros
    });

    // Si no encontramos usuarios o las credenciales son incorrectas
    if (response.data.length === 0) {
      return { success: false, message: 'Credenciales inválidas' };
    }

    const user = response.data[0]; // Tomamos el primer usuario encontrado

    // Generamos un "token" falso para simular la autenticación
    const authToken = `fake-jwt-token-${user.id}`;

    // Guardamos el token y el usuario en localStorage
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('user', JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    // En caso de error en la solicitud
    return { success: false, message: error };
  }
};

// Logout del usuario
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

// Obtener el usuario actual desde localStorage
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// Verificar si el usuario está autenticado (comprobando si existe el token)
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};
