import axios from "axios";

const API_URL = "http://localhost:5000/users";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.get(API_URL, {
      params: { username, password },
    });

    if (response.data.length === 0) {
      return { success: false, message: "Credenciales inválidas" };
    }

    return { success: true, user: response.data[0] };
  } catch (error) {
    return { success: false, message: "Error al conectar con el servidor: ", error };
  }
};
