import api from "./myApi";
import { jwtDecode } from "jwt-decode";


export const apiLogin = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    const { accessToken } = response.data;
    localStorage.setItem("token", accessToken); // ✅ Guardamos el token
    localStorage.setItem("expiresAt", response.data.expiresAt); // Guardamos la fecha de expiración

    return response.data; // Devuelve el token JWT y si el usuario tiene 2FA
  } catch (error) {
    return { message: error.response.data.message, error };
  }
};

export const verify2FA = async (email, code, rememberDevice) => {
  try {
    const response = await api.post("/auth/verify-2fa", { email, code, rememberDevice });
    return response;  // ✅ Devolvemos la respuesta completa
  } catch (error) {
    return error.response;  // ❌ En caso de error, devolvemos la respuesta del backend
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', email);
    return response;
  } catch (error) {
    console.error('Error al solicitar recuperación de contraseña:', error);
    return { success: false, message: error.response?.data?.message || 'Error inesperado' };
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await api.post('/auth/reset-password', { token, password });
    return response; // ✅ Aseguramos que devuelva solo la data
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    return { success: false, message: error.response?.data?.message || 'Error inesperado' };
  }
};

export const apiSignUp = async (firstName, lastName, email, password) => {
  try {
    const response = await api.post('/auth/register', { firstName, lastName, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error inesperado' };
  }
};

// ✅ Decodificar el token y extraer datos
export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const role = decoded.role?.[0]?.name.replace("ROLE_", "").toLowerCase(); // ✅ Convertimos el rol
    return {
      username: decoded.sub, // Normalmente el email o username
      role: role || "user", // ✅ Asignamos "user" por defecto si no hay rol
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};