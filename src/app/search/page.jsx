import { useRouter } from 'next/navigation';

const SearchPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Search Result Details</h1>
      <p>ID: {id}</p>
    </div>
  );
}

export default SearchPage;

