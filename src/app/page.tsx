import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';
import Component from '../components/Component';


export default function Home() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <Main />
      <Footer />
      <Component />
    </div>
  );
}
