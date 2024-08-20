'use client';

import Nav from '../components/Header/Nav/Nav';
import Banner from '../components/Header/Banner/Banner';
import Footer from '../components/Footer/Footer';
import ComponentList from '../components/Main/GenreList.jsx/GenreList';
import GuardianNews from '../pages/api/theGuardianAPI';

export default function Home() {
  return (
    <div className='max-w-7xl mx-auto h-96'>
      <Nav />
      <Banner />
      <ComponentList />
      <GuardianNews />
      <Footer />
    </div>
  );
}

