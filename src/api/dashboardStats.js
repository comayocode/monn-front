const API_URL = 'http://localhost:5000/dashboardStats';

export const getDashboardStats = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error fetching dashboard stats');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
