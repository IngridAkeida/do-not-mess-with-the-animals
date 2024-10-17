import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { NavigationInfo, NavigationUser } from '@/components/uiComponents/MenuList/MenuList';
import Link from 'next/link';
import LayoutSection from '@/components/uiComponents/Layouts/LayoutSection';
import { useTheme } from 'next-themes';

const Footer = () => {
  const { theme } = useTheme();
  return (
    <LayoutSection>
      <div className='mx-6'>
        <div className='container flex flex-col md:flex-row justify-center  md:justify-between items-center'>
          <div className='mb-6 lg:mb-0'>
            <h2 className='text-xl font-bold'>Newsletter</h2>
            <form className='flex flex-col gap-y-2'>
              <input
                type='name'
                placeholder='Your name'
                className='px-3 py-2 border rounded mb-2 sm:mb-0'
                required
              />
              <input
                type='email'
                placeholder='Your best email'
                className='px-3 py-2 border rounded mb-2 sm:mb-0'
                required
              />
              <button
                type='submit'
                className={` text-white px-3 py-2 rounded ${theme === 'dark' ? 'bg-dark-accent-a30  hover:bg-dark-accent-a40' : 'bg-dark-primary-a40   hover:bg-dark-primary-a30 '}`}
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className='mb-6 lg:mb-0'>
            <h2 className='text-xl font-bold mb-2'>Site Map</h2>
            <ul className='space-x-2 flex gap-4'>
              {NavigationInfo.map((section) => (
                <li key={section.name}>
                  <h3 className='font-semibold'>{section.name}</h3>
                  <ul className='space-y-1'>
                    {section.subMenu.map((item) => (
                      <li key={item.name} className='flex items-center'>
                        <Link href={item.href} className='flex items-center hover:underline'>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='mt-2'>
          <hr className='border-t-2 pt-2 border-gray-300'/>
          <ul className='flex space-x-4 justify-between'>
            <NavigationUser />
            <div className='text-sm py-1'> © {new Date().getFullYear()} All rights reserved. </div>
            <div className='flex space-x-4 justify-end items-end'>
              <Link href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='text-2xl'>
                <FaFacebook />
              </Link>
              <Link href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='text-2xl'>
                <FaTwitter />
              </Link>
              <Link href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='text-2xl'>
                <FaInstagram />
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </LayoutSection>
  );
};

export default Footer;
