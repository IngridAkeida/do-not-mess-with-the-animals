'use client'
import { useDatas } from '@/components/Main/UseDatas/UseDatas';
import BannerResult from '@/components/Main/BannerResult/BannerResult';
import Layout from '@/components/uiComponents/Layouts/LayoutContainer';

const Tvshow = () => {
  const fetchpath ='serverDataTMDBTvShow';
  const { resultData, loading, error } = useDatas({fetchpath}); 
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const item = resultData;

  return (
    <Layout>
      <main>
        <BannerResult item={item}/>
      </main>
    </Layout>
  );
}

export default Tvshow;