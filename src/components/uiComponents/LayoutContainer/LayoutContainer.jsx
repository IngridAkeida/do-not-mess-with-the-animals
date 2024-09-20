import Nav from '@/components/Header/Nav/Nav';
import Footer from '@/components/Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className='max-w-7xl mx-auto h-96'>
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;