import { useState, useEffect } from 'react';
import { apiGetMovements, apiAddMovement, apiGetMovementsByExpense, apiGetMovementsByIncome } from '../api/movements';
import useToast from '@/hooks/useToast';


const useMovements = () => {
  const [movements, setMovements] = useState([]);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const data = await apiGetMovements();
        setMovements(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovements();
    getIncome();
    getExpense();
  }, []);

  const handleAddMovement = async (movementData) => {
    try {
      const response = await apiAddMovement(movementData);
      console.log('Response apiAddMovement', response);
      setMovements((prev) => ({
        ...prev,
        data: [...prev.data, response],
      }));
      addToast('Movimiento agregado correctamente', 'success');
    } catch (err) {
      addToast('Error al agregar el movimiento', 'error');
    }
  }

  const getIncome = async () => {
    try {
      const incomeData = await apiGetMovementsByIncome();
      setIncome(incomeData.data || []);
      return incomeData;
    } catch (err) {
      console.error('Error fetching income movements:', err);
      return [];
    }
  };

  const getExpense = async () => {
    try {
      const expenseData = await apiGetMovementsByExpense();
      setExpense(expenseData.data || []);
      return expenseData;
    } catch (err) {
      console.error('Error fetching expense movements:', err);
      return [];
    }
  };



  return { movements, handleAddMovement, income, expense, loading, error };
};

export default useMovements;
