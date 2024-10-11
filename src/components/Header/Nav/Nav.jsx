'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DropDownMenu from './DropDownMenu/DropDownMenu';
import UserPreferencesMenu from './UserPreferencesMenu/UserPreferencesMenu';
import SearchField from '@/components/uiComponents/SearchField/SearchField';
import MenuMobile from './MenuMobile/MenuMobile';

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHeader, setActiveHeader] = useState(false);

  const SearchWrapStyle = 'hidden sm:block text-base relative m-2';
  const SearchInputStyle = 'p-1 sm:pl-4 sm:w-80 max-w-md bg-dark-accent-a40 opacity-80 rounded-2xl text-white outline-none border border-dark-accent-a40 focus:border-dark-accent-a30';
  const SearchButtonStyle = 'p-2 sm:pl-6 bg-dark-accent-a40 hover:bg-dark-accent-a40 rounded-r-3xl absolute right-0 text-white';
  const SearchButtonDisabledStyle = 'text-dark-neutral-a0 cursor-none';

  useEffect(() => {
    const handleScroll = () => setActiveHeader(window.scrollY > 10);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
    
  
  return (
    <header className={`sticky top-0 z-50 mx-auto bg-opacity-100 shadow-sm ${activeHeader ? 'bg-dark-neutral-a40' : ''}`}>
      <nav className='flex items-center justify-between px-4 lg:px-10' aria-label='Global'>
        <div className='flex'>
          <Link href='/' className=''>
            <span className='sr-only'>Logo</span>
            <Image className='w-56' src='/assets/logowsc.png' alt='Logo' width={2000} height={500} style={{ objectFit: 'contain' }} />
          </Link>
        </div> 
        <div className='flex sm:hidden'>
          <button
            type='button'
            className='inline-flex items-center justify-center rounded-md my-2 mx-1'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className='sr-only'>Open main menu</span>
            <div className='flex flex-col gap-1'>
              <div className={`bg-dark-menu-y10 w-6 h-0.5 rounded-sm transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`bg-dark-menu-y10 w-6 h-0.5 rounded-sm transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`bg-dark-menu-y10 w-6 h-0.5 rounded-sm transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>
        <div className='hidden sm:flex sm:w-[85%] sm:justify-between'>
          <div className='flex mx-auto'><DropDownMenu/></div>
          <div className='flex flex-row justify-end gap-2'>
            <SearchField 
              wrapStyle={SearchWrapStyle} 
              inputStyle={SearchInputStyle} 
              buttonStyle={SearchButtonStyle}
              buttonDisabledStyle={SearchButtonDisabledStyle} 
            />
            <UserPreferencesMenu />
          </div>
        </div>
      </nav>
      {mobileMenuOpen && (
        <MenuMobile setMobileMenuOpen={setMobileMenuOpen}/>
      )}
    </header>
  );
};


export default Nav;
