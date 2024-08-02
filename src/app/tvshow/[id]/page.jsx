'use client'

import Nav from '../../../components/Header/Nav/Nav';
import { useCombineData } from '../../../components/Main/CombineDatas/CombineDatas';
import BannerResult from '../../../components/Main/BannerResult/BannerResult';
import TriggerResult from '../../../components/Main/TriggerResult/TriggerResult';
import Footer from '../../../components/Footer/Footer';


const Tvshow = () => {
  const fetchpath ='serverDataTMDBTvShow';
  const { combineData, loading, error } = useCombineData({fetchpath}); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const item = combineData.tmdbData;
  const triggers = combineData.allGroups;

  return (
    <div className='max-w-7xl mx-auto bg-dark-neutral-a40 text-white'>
      <Nav/>
      <main>
        <BannerResult item={item} />
        <TriggerResult triggers={triggers} item={item}/>
      </main>
      <Footer/>
    </div>
  );
}

export default Tvshow;