'use client'
import { useCombineData } from '../../../components/Main/CombineDatas/CombineDatas';
import BannerResult from '../../../components/Main/BannerResult/BannerResult';
import Layout from '@/components/uiComponents/LayoutContainer/LayoutContainer';

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
    <Layout>
      <main>
        <BannerResult item={item} triggers={triggers}/>
      </main>
    </Layout>
  );
}

export default Movie;