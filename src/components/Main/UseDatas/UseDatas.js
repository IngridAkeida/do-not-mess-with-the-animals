import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useDatas = ({fetchpath}) => {
  const { id } = useParams();
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/${fetchpath}?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResultData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, fetchpath]);

  return { resultData, loading, error };
};

export default useDatas;