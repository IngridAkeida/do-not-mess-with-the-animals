'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DropDownMenu from './DropDownMenu/DropDownMenu';
import UserPreferencesMenu from './UserPreferencesMenu/UserPreferencesMenu';
import SearchField from '../../uiComponents/SearchField/SearchField';

import MenuMobile from './MenuMobile/MenuMobile';

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHeader, setActiveHeader] = useState(false);

  const SearchWrapStyle = 'hidden sm:block text-base sm:text-base relative m-2';
  const SearchInputStyle = 'p-1 pl-4 sm:w-80 max-w-md bg-alert-warning-100 rounded-2xl text-black outline-none';
  const SearchButtonStyle = 'p-2 pl-6 bg-gradient-to-l from-dark-menu-y10 to-alert-warning-100 hover:bg-dark-menu-y10 rounded-r-3xl absolute right-0 text-dark-neutral-a40';
  const SearchButtonDisabledStyle = 'text-gray-500 cursor-none';

  useEffect(() => {
    const handleScroll = () => setActiveHeader(window.scrollY > 10);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
    
  
  return (
    <header className={`sticky top-0 z-50 mx-auto bg-dark-neutral-a40 shadow-sm ${activeHeader ? 'bg-opacity-90' : ''}`}>
      <nav className='flex items-center justify-between px-4 lg:px-10' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <Link href='/' className='pt-2'>
            <span className='sr-only'>Logo</span>
            <Image className='w-20' src='/assets/logowsc.png' alt='Logo' width={1000} height={500} style={{ objectFit: 'contain' }} />
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
        <div className='flex w-[85%] justify-between'>
          <DropDownMenu />
          <SearchField 
            wrapStyle={SearchWrapStyle} 
            inputStyle={SearchInputStyle} 
            buttonStyle={SearchButtonStyle}
            buttonDisabledStyle={SearchButtonDisabledStyle} 
          />
          <UserPreferencesMenu />
        </div>
      </nav>
      {mobileMenuOpen && (
        <MenuMobile setMobileMenuOpen={setMobileMenuOpen}/>
      )}
    </header>
  );
};


export default Nav;
