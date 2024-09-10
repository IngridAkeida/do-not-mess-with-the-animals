'use client';
import GuardianNews from '../../../pages/api/theGuardianAPI';
import Link from 'next/link';
import { NavigationInfo } from '../../uiComponents/MenuList/MenuList';
import { useState } from 'react';

const List = () => {
  const [toggle, setToggle] = useState(false);
  const navigationInfo = NavigationInfo;

  return (
    <div className='flex flex-col gap-2 mx-2 my-2 md:mx-0'>
      <h2 className='bg-gradient-to-br from-dark-primary-a40 to-dark-primary-a30 font-semibold text-3xl text-center bg-black rounded-md p-2'> Looking for the main tredings and genres</h2>
        <div className='bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a30 to-dark-primary-a40'>
            <h1 className='text-center text-2xl mb-4 text-white font-semibold'>News</h1>
            <GuardianNews />
        </div>
        <div className='bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a30 to-dark-primary-a40'>
          <div className='relative'>
            <div className='absolute top-2 right-2'>
              <label className='inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  className='sr-only'
                  checked={toggle}
                  onChange={() => setToggle(!toggle)}
                />
                <div className='block border border-dark-primary-a20 bg-dark-menu-y10 w-36 h-8 rounded-full'></div>
                <div
                  className={`dot absolute left-1 top-1 bg-dark-primary-a20  w-18 h-6 px-2 text-center rounded-full duration-300 transition shadow-2xl ${
                    toggle ? 'transform translate-x-14' : ''
                  }`}
                >{toggle ? 'Tv Show':'Movie'}</div>
              </label>
            </div>
            <div key={navigationInfo[toggle ? 1 : 0].name}>
              <h1 className='text-center text-2xl mb-4 text-white font-semibold'>
                The Main Content About {navigationInfo[toggle ? 1 : 0].name}
              </h1>
              <div className='flex flex-wrap flex-row gap-4 justify-center items-center my-4 pb-4'>
                {navigationInfo[toggle ? 1 : 0].subMenu.map((subItem) => (
                  <Link key={subItem.name} href={subItem.href} passHref>
                    <div className='h-80 w-52 border rounded-md flex flex-col items-center justify-center bg-dark-accent-a40 hover:bg-dark-accent-a30 transition duration-300 cursor-pointer text-white hover:text-dark-accent-a0 hover:animate-jump animate-once animate-duration-1000 animate-ease-in-out'>
                      <span>{subItem.icon}</span>
                      <div className='text-center mt-4'>{subItem.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
        <div className='bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a30 to-dark-primary-a40'>
          {navigationInfo.slice(2).map((item) => (
            <div key={item.name}>
            <h1 className='text-center text-2xl mb-4 text-white font-semibold'>{item.name}</h1>
              <div className='flex flex-wrap flex-row gap-4 justify-center items-center my-4 pb-4'>
                {item.subMenu.map((subItem) => (
                <Link key={subItem.name} href={subItem.href} passHref> 
                  <div 
                    className='h-80 w-52 border rounded-md flex flex-col items-center justify-center bg-dark-accent-a40 hover:bg-dark-accent-a30 transition duration-300 cursor-pointer text-white hover:text-dark-accent-a0 hover:animate-jump animate-once animate-duration-1000 animate-ease-in-out' 
                  >
                    <span>{subItem.icon}</span>
                    <div className='text-center mt-4'>
                      {subItem.name}
                    </div>
                  </div>
                </Link>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
    </div>
  );
}

export default List;