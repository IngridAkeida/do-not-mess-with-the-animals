'use client'
import Nav from '../../../components/Header/Nav/Nav';
import { useCombineData } from '../../../components/Main/CombineDatas/CombineDatas';
import BannerResult from '../../../components/Main/BannerResult/BannerResult';
import Footer from '../../../components/Footer/Footer';

const Movie = () => {
  const fetchpath ='serverDataTMDBMovie';
  const { combineData, loading, error } = useCombineData({fetchpath}); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const item = combineData.tmdbData;
  const triggers = combineData.allGroups;

  console.log('item:', item);

  return (
    <div className='max-w-7xl mx-auto bg-dark-neutral-a50 text-white'>
      <Nav/>
      <main>
        <BannerResult item={item} triggers={triggers}/>
      </main>
      <Footer/>
    </div>
  );
}

export default Movie;