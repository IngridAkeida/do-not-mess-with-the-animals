"use client";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ComponentList from "../components/Main/GenreList.jsx/GenreList";

export default function Home() {
  return (
    <div className='max-w-7xl mx-auto h-96'>
      <Header />
      <ComponentList />
      <Footer />
    </div>
  );
}

