'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchPage = () => {
  const router = useRouter();
  const [id, setId] = useState();

  useEffect(() => {
    if (router.isReady) {
      const { id: queryId } = router.query;
      setId(queryId);
    }
  }, [router.isReady, router.query]);

  return (
    <div>
      <h1>Search Result Details</h1>
      <p className='text-white'>ID: {id}</p>
    </div>
  );
}

export default SearchPage;