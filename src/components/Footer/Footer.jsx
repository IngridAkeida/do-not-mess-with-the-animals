import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { NavigationInfo, NavigationUser } from '@/components/uiComponents/MenuList/MenuList';
import Link from 'next/link';
import LayoutSection from '@/components/uiComponents/LayoutContainer/LayoutSection';

const Footer = () => {
  return (
    <LayoutSection>
      <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center'>
        <div className='mb-6 lg:mb-0'>
          <h2 className='text-xl font-bold mb-2'>Newsletter</h2>
          <form className='flex flex-col sm:flex-row'>
            <input
              type='email'
              placeholder='Enter your email'
              className='px-3 py-2 border rounded mb-2 sm:mb-0 sm:mr-2'
              required
            />
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
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
        <div className='flex space-x-4'>
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
      </div>
      <div className='mt-4'>
        <ul className='flex space-x-4'>
          <NavigationUser />
        </ul>
      </div>
    </LayoutSection>
  );
};

export default Footer;
