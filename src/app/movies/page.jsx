const Test = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const encodedTerm = encodeURIComponent(searchTerm);
      const response1 = await fetch(`/api/serverDataDDDQuery?query=${encodedTerm}`);
      if (!response1.ok) {
        throw new Error('Failed to fetch data');
      }
      const dataQuery = await response1.json();
      const ids = dataQuery.items.map(item => item.id);
      if(!ids || ids.length === 0){
        throw new Error('ID not found in the first API response');
      }

      const fetchingResultsIds = async (ids) => {
        const resultsIDs = {}
        for (const id of ids) {
          try {
            const response2 = await fetch(`/api/serverDataDDDId?id=${id}`);
            if (!response2.ok) {
              throw new Error('Failed to fetch data');
            }
            const dataId = await response2.json();
            resultsIDs[id] = dataId.allGroups;
          } catch (error) {
            console.error(`Error fetching data for ID ${id}:`, error);
          }
        }
        console.log(resultsIDs);
        return resultsIDs;
        
      };
      const resultsIds = await fetchingResultsIds(ids);

      //conbine both responses
      const combinedData = dataQuery.items.map((itemQuery) => ({
        ...itemQuery,
        additionalData: resultsIds[itemQuery.id]
      }));

      setResults(combinedData);
      console.log(combinedData)

    } catch (error) {
      setError(error.message);
    }
  };
  return <div>Test</div>
}

export default Test;