'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHeader, setActiveHeader] = useState(false);

  const navigation = [
    { name: 'Movies', href: '/' },
    { name: 'TV Shows', href: '/' },
    { name: 'People', href: '/' },
    { name: 'Language', href: '/' },
    { name: 'Search', href: '/' },
    { name: 'Account', href: '/' }
  ];

  useEffect(() => {
    const handleScroll = () => setActiveHeader(window.scrollY > 10);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 mx-auto bg-amber-800 shadow-sm ${activeHeader ? 'bg-opacity-90' : ''}`}>
      <nav className='flex items-center justify-between px-4 lg:px-10' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <Link href='/' className='pt-2'>
            <span className='sr-only'>Logo</span>
            <Image src='/assets/logo-s.png' alt='Logo' width={1000} height={500} style={{ objectFit: 'contain' }} />
          </Link>
        </div>
        <div className='flex md:hidden'>
          <button
            type='button'
            className='inline-flex items-center justify-center rounded-md text-white'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className='sr-only'>Open main menu</span>
            <div className='flex flex-col gap-1'>
              <div className={`w-6 h-0.5 bg-white rounded-sm transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white rounded-sm transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white rounded-sm transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>
        <div className='hidden md:flex lg:gap-x-12'>
          {navigation.slice(0, 3).map((item) => (
            <a key={item.name} href={item.href} className='text-sm font-semibold leading-6 text-white'>
              {item.name}
            </a>
          ))}
        </div>
        <div className='hidden md:flex lg:gap-x-12'>
          {navigation.slice(3).map((item) => (
            <a key={item.name} href={item.href} className='text-sm font-semibold leading-6 text-white'>
              {item.name}
            </a>
          ))}
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className='lg:hidden fixed inset-0 z-50 w-full bg-amber-800 px-6 py-6'>
          <div className='flex items-center justify-between mb-6'>
            <Link href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Logo</span>
              <Image src='/assets/logo-s.png' alt='Logo' width={1000} height={500} style={{ objectFit: 'contain' }} />
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-white'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <div className='hover:bg-black'>
                <div className='w-6 h-0.5 bg-white rounded-sm rotate-45 translate-y-0.5'></div>
                <div className='w-6 h-0.5 bg-white rounded-sm -rotate-45 translate-y-0'></div>
              </div>
            </button>
          </div>
          <div className='space-y-2'>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-amber-700'
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
