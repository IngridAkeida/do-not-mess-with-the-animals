"use client";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ComponentList from "../components/Main/GenreList.jsx/GenreList";
import ComponentQuery from "../components/testApi/ComponentQuery";
import ComponentId from "../components/testApi/ComponentId";
import ComponentIdTMDB from "../components/testApi/ComponentIdTMDB";
import ComponentIdTMDBTV from "../components/testApi/ComponentIdTMDBTV";

import Login from "./login/page";
import Signup from "../components/Main/Registration/Signup";
import User from "./user/User";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto bg-dark-neutral-a50">
      {/* <Login /> */}
      {/* < Signup /> */}
      {/* <User />  */}
      {/* <Header />
      <ComponentList />
      <Footer /> */}

      {/* <ComponentQuery />  */}
      {/* <ComponentId />  */}
      {/* <ComponentIdTMDB /> */}
      {/* <ComponentIdTMDBTV /> */}
      {/* <SearchResults /> */}
    </div>
  );
}
