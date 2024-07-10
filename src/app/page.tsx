import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';
import ComponentQuery from '../components/testApi/ComponentQuery';
import ComponentId from '../components/testApi/ComponentId';
import ComponentIdTMDB from '../components/testApi/ComponentIdTMDB';
import SearchResults from '../components/uiComponents/SearchResults/outro';


export default function Home() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <Main />
      <Footer />
      {/* <ComponentQuery />  */}
      {/* <ComponentId />  */}
      {/* <ComponentIdTMDB /> */}
      {/* <SearchResults /> */}
    </div>
  );
}
