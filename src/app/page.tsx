"use client";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ComponentList from "../components/Main/GenreList.jsx/GenreList";

import Login from "./login/page";
import Signup from "../components/Main/Registration/Signup";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto bg-dark-neutral-a50">
      {/* <Login /> */}
      {/* < Signup /> */}
      <Header />
      <ComponentList />
      <Footer />
    </div>
  );
}
