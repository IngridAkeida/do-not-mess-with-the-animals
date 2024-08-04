'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchField from '../../uiComponents/SearchField/SearchField';

import { Navigation } from '../../uiComponents/MenuList/MenuList';

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHeader, setActiveHeader] = useState(false);

  const SearchWrapStyle = 'hidden sm:block text-base sm:text-base relative m-2';
  const SearchInputStyle = 'p-1 sm:w-80 max-w-md bg-blue-100 rounded-xl text-blue-900';
  const SearchButtonStyle = 'p-1 bg-teal-600 hover:bg-dark-neutral-a40 rounded-xl absolute right-0 text-white hover:text-blue-100';

  const navigation = Navigation;

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
            {/* <div className='bg-white w-auto h-auto text-black m-2 p-1'>⚙️</div> */}
            <Image className='w-20' src='/assets/logowsc.png' alt='Logo' width={1000} height={500} style={{ objectFit: 'contain' }} />
          </Link>
        </div>
        
        <div className='flex md:hidden'>
          <button
            type='button'
            className='inline-flex items-center justify-center rounded-md text-blue-200 hover:text-blue-100 hover:bg-dark-neutral-a40 my-2 mx-1'
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
        <div className='hidden md:flex lg:gap-x-12'>
          {navigation.slice(0, 3).map((item) => (
            <a key={item.name} href={item.href} className='text-sm font-semibold leading-6 text-blue-200 hover:text-blue-100 hover:bg-dark-neutral-a40 my-2 mx-1'>
              {item.name}
            </a>
          ))}
        </div>
        <SearchField 
          wrapStyle={SearchWrapStyle} 
          inputStyle={SearchInputStyle} 
          buttonStyle={SearchButtonStyle} 
        />
        <div className='hidden md:flex lg:gap-x-12'>
          {navigation.slice(3).map((item) => (
            <a key={item.name} href={item.href} className='text-sm font-semibold leading-6 text-blue-200 hover:text-blue-100 hover:bg-dark-neutral-a40 my-2 mx-1'>
              {item.name}
            </a>
          ))}
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className='lg:hidden fixed inset-0 z-50 w-full bg-dark-neutral-a40 bg-opacity-95 px-4 py-2'>
          <div className='flex items-center justify-between mb-6'>
            <Link href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Logo</span>
              {/* <div className='bg-white w-auto h-auto text-black m-2 p-1'>⚙️</div> */}
              <Image className='w-20' src='/assets/logowsc.png' alt='Logo' width={1000} height={500} style={{ objectFit: 'contain' }} />
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-blue-200 hover:text-blue-100 hover:bg-dark-neutral-a40 my-2 mx-1'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <div className='hover:bg-black'>
                <div className='w-6 h-0.5 bg-dark-menu-y10 rounded-sm rotate-45 translate-y-0.5'></div>
                <div className='w-6 h-0.5 bg-dark-menu-y10 rounded-sm -rotate-45 translate-y-0'></div>
              </div>
            </button>
          </div>
          <div className='space-y-2'>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue-200 hover:text-blue-100 hover:bg-dark-neutral-a40 my-2 '
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
