import { useState, useEffect } from 'react';
import { apiGetMovements, apiAddMovement, apiGetMovementsByExpense, apiGetMovementsByIncome, apiUpdateMovement } from '../api/movements';
import useToast from '@/hooks/useToast';


const useMovements = () => {
  const [movements, setMovements] = useState([]);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToast } = useToast();
  const [movementToView, setMovementToView] = useState(null);

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
      console.error('Error agregando el movimiento:', err);
      addToast('Error al agregar el movimiento', 'error');
    }
  }

  const handleUpdateMovement = async (movementData) => {
    try {
      const { id, ...rest } = movementData;
      if (!id) throw new Error('No se encontró el id del movimiento');
      const updated = await apiUpdateMovement(id, rest);
      // TODO: Ajustar actualización de data en tabla al actualizar movimientos
      addToast('Movimiento actualizado correctamente', 'success');
      return updated;
    } catch (err) {
      console.error('Error actualizando el movimiento:', err);
      // Si err.data es un objeto con validaciones, muestra el primer mensaje
      if (err && typeof err === 'object' && err.data && typeof err.data === 'object') {
        const keys = Object.keys(err.data);
        if (keys.length > 0) {
          addToast(err.data[keys[0]], 'error');
          return null;
        }
      }
      // Si err es un string o tiene message
      addToast(err.message || String(err), 'error');
      return null;
    }
  };

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

  const handleToViewMovement = (movement) => {
    setMovementToView({
      ...movement,
      counterpartyName: movement.counterparty?.counterpartyName || '',
      counterpartyId: movement.counterparty?.counterpartyId || '',
    });
  }

  return { movements, movementToView, handleAddMovement, handleUpdateMovement, handleToViewMovement, income, expense, loading, error };
};

export default useMovements;
