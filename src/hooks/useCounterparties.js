import { useEffect, useState } from "react"
import { apiGetCounterparties } from "../api/counterparty"

const useCounterparties = () => {
  const [counterparties, setCounterparties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCounterparties();
  }, []);

  const getCounterparties = async () => {
    try {
      setLoading(true);
      const response = await apiGetCounterparties();
      setCounterparties(response);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return { counterparties, loading, error };
}

export default useCounterparties;

