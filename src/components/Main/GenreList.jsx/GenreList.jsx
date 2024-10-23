'use client';
import LayoutSection from '@/components/uiComponents/Layouts/LayoutSection';
import LayoutCards from '@/components/uiComponents/Layouts/LayoutCards';
import Subtitle from '@/components/uiComponents/Layouts/LayoutSubtitles';
import GuardianNews from '@/pages/api/theGuardianAPI';
import Link from 'next/link';
import { NavigationInfo } from '@/components/uiComponents/MenuList/MenuList';
import { useState } from 'react';

const List = () => {
  const [toggle, setToggle] = useState(false);
  const navigationInfo = NavigationInfo;

  const adicionalStyle = 'rounded-md';

  return (
    <div className='flex flex-col gap-2 mx-2 my-2 md:mx-0'>
      <LayoutSection adicionalStyle={adicionalStyle} >
        <h2 className='font-semibold text-3xl text-center'> Looking for the main tredings and genres</h2>
      </LayoutSection>
      <LayoutSection>
        <Subtitle>News</Subtitle>
        <GuardianNews />
      </LayoutSection>
      <LayoutSection>
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
                className={`dot absolute left-1 top-1 bg-dark-primary-a20  w-18 h-6 px-2 text-center rounded-full duration-300 transition ${
                  toggle ? 'transform translate-x-14' : ''
                }`}
              >{toggle ? 'Tv Show':'Movie'}</div>
            </label>
          </div>
          <div key={navigationInfo[toggle ? 2 : 1].name}>
            <Subtitle>
              The Main Content About: <span className='font-bold'> {navigationInfo[toggle ? 2 : 1].name}</span>
            </Subtitle>
            <div className='flex flex-wrap flex-row gap-4 justify-center items-center my-4 pb-4'>
              {navigationInfo[toggle ? 2 : 1].subMenu.map((subItem) => (
                <Link key={subItem.name} href={subItem.href} passHref>
                  <LayoutCards>
                    <span>{subItem.icon}</span>
                    <div className='text-center mt-4'>{subItem.name}</div>
                  </LayoutCards>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </LayoutSection>
      <LayoutSection>
      {navigationInfo.slice(3).map((item) => (
        <div key={item.name}>
        <Subtitle>{item.name}</Subtitle>
          <div className='flex flex-wrap flex-row gap-4 justify-center items-center my-4 pb-4'>
            {item.subMenu.map((subItem) => (
            <Link key={subItem.name} href={subItem.href} passHref> 
              <LayoutCards>
                <span>{subItem.icon}</span>
                <div className='text-center mt-4'>
                  {subItem.name}
                </div>
              </LayoutCards>
            </Link>
            ))}
          </div>
        </div>
      ))}
      </LayoutSection>
    </div>
  );
}

export default List;