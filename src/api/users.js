import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

// Obtener todos los usuarios
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return [];
  }
};

// Agregar un usuario
export const addUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    return null;
  }
};

// Editar un usuario
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return null;
  }
};

// Eliminar un usuario
export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/${userId}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return false;
  }
};
