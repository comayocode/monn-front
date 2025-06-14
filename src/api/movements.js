import api from "./myApi";

export const apiGetMovements = async () => {
  try {
    const response = await api.get("/movements");
    return response.data;
  } catch (error) {
    console.error('Error al obtener los movimientos:', error);
    return [];
  }
};

export const apiAddMovement = async (data) => {
  try {
    const response = await api.post('/movements', data);
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

export const apiGetMovementsByIncome = async () => {
  try {
    const response = await api.get(`/movements?type=${'INCOME'}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los movimientos por tipo:', error);
    return [];
  }
}

export const apiGetMovementsByExpense = async () => {
  try {
    const response = await api.get(`/movements?type=${'EXPENSE'}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los movimientos por tipo:', error);
    return [];
  }
}

