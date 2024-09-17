//const TVShowsUpcomingPage = () => {
  // const [list, setList] = useState([]);
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadAllGenres = async () => {
  //     try {
  //       const listPopular = await getListTvshowNew();
  //       if (listPopular) {
  //         setList(listPopular);
  //       } else {
  //         setError('Failed to load.');
  //       }
  //     } catch (e) {
  //       setError('Failed to load.');
  //       console.error(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadAllGenres();
  // }, []);

  // if (loading) {
  //   return <div className='text-white'>Loading...</div>;
  // }

  // if (error) {
  //   return <div className='text-white'>Error: {error}</div>;
  // }
//   return (
//     <div>here</div>
//   );
// }

// export default TVShowsUpcomingPage;