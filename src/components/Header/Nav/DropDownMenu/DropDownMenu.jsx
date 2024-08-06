import { useState } from 'react';
import { NavigationInfo } from '../../../uiComponents/MenuList/MenuList';
import { useRouter } from 'next/navigation';

const DropDownMenu = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigationInfo = NavigationInfo;
  const router = useRouter();

  const handleOptionClick = (href) => {
    router.push(href);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className='hidden sm:flex lg:gap-x-12'>
      {navigationInfo.map((item) => (
        <div key={item.name} className='relative my-2 mx-1'>
          <button
            className='text-sm font-semibold leading-6 text-alert-danger-100 hover:text-dark-menu-y10'
            onClick={() => toggleDropdown(item.name)}
          >
            {item.name}
          </button>
          {openDropdown === item.name && (
            <div className='absolute top-full left-0 mt-1 bg-dark-neutral-a40 rounded shadow-lg'>
              {item.subMenu
                ? item.subMenu.map((subItem) => (
                    <div
                      key={subItem.name}
                      className='cursor-pointer px-4 py-2 text-sm font-semibold text-alert-danger-100 hover:bg-dark-menu-y10 hover:text-dark-neutral-a40'
                      onClick={() => handleOptionClick(subItem.href)}
                    >
                      {subItem.name}
                    </div>
                  ))
                : (
                  <div
                    className='cursor-pointer px-4 py-2 text-sm font-semibold text-alert-danger-100 hover:bg-dark-menu-y10'
                    onClick={() => handleOptionClick(item.href)}
                  >
                    {item.name}
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
