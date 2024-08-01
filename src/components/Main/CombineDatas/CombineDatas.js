import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useCombineData = ({fetchpath}) => {
  const { id } = useParams();
  const [combineData, setCombineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/serverDataDDDId?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const tmdbId = data.item.tmdbId;

        const tmdbData = await fetch(`/api/${fetchpath}?id=${tmdbId}`).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        });

        const combinedData = {
          ...data,
          tmdbData
        };

        setCombineData(combinedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, fetchpath]);

  return { combineData, loading, error };
};