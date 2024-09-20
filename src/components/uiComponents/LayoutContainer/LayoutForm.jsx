import Nav from '@/components/Header/Nav/Nav';
import Footer from '@/components/Footer/Footer';

const LayoutForm = ({ children }) => {
  return (
    <div className='max-w-7xl mx-auto bg-dark-primary-a40'>
      <Nav />
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-dark-primary-a30 via-dark-primary-a20 to-dark-primary-a30 text-dark-neutral-a40'>
          <div className='bg-dark-accent-a40 p-8 rounded shadow-md w-80 border border-dark-menu-y10'>
            {children}
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default LayoutForm;