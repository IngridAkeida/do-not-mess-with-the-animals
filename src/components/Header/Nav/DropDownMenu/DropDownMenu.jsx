import { useEffect, useRef, useState } from 'react';
import { NavigationInfo } from '../../../uiComponents/MenuList/MenuList';
import Link from 'next/link';

const DropDownMenu = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigationInfo = NavigationInfo;
  const dropdownRef = useRef(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className='hidden sm:flex gap-x-2 lg:gap-x-6'>
    {navigationInfo.map((item) => (
      <div key={item.name} className='relative my-auto' ref={dropdownRef}>
        <button
          className='text-sm font-semibold leading-6 text-alert-danger-100 hover:text-dark-menu-y10'
          onClick={() => toggleDropdown(item.name)}
        >
          {item.name}
        </button>
        {openDropdown === item.name && (
          <div className='absolute top-11 left-0 bg-dark-neutral-a40 rounded shadow-lg border border-dark-menu-y10 flex flex-col'>
            {item.subMenu
              ? item.subMenu.map((subItem) => (
                  <Link
                    key={subItem.name}
                    className='cursor-pointer px-4 py-2 text-sm font-semibold text-alert-danger-100 hover:bg-dark-menu-y10 hover:text-dark-neutral-a40'
                    href={subItem.href}
                  >
                    {subItem.name}
                  </Link>
                ))
              : (
                <div
                  className='cursor-pointer px-4 py-2 text-sm font-semibold text-alert-danger-100 hover:bg-dark-menu-y10'>
                  not found
                </div>
              )}
          </div>
        )}
      </div>
    ))}
  </div>
  );
}

export default DropDownMenu;
