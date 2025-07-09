import api from "./myApi";

export const apiGetCounterparties = async () => {
  try {
    const response = await api.get("/counterparties");
    return response.data;
  } catch (error) {
    console.error('Error al obtener los contactos:', error);
    return [];
  }
};