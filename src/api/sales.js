export const getSalesData = async () => {
  const response = await fetch("http://localhost:5000/sales");
  const data = await response.json();
  return data;
};
