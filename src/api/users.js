import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return [];
  }
};