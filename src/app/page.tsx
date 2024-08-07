"use client";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ComponentList from "../components/Main/GenreList.jsx/GenreList";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto bg-dark-neutral-a50">
      <Header />
      <ComponentList />
      <Footer />
    </div>
  );
}
