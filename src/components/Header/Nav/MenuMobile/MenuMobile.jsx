import Image from "next/image";
import Link from "next/link";

import { NavigationInfo, NavigationUser } from '../../../uiComponents/MenuList/MenuList';

const MenuMobile = ({setMobileMenuOpen}) => {
  const navigationInfo = NavigationInfo;
  const navigationUser = NavigationUser;

  return(
    <div className='sm:hidden fixed inset-0 z-50 w-full bg-dark-neutral-a40 bg-opacity-95 px-4 py-2'>
          <div className='flex items-center justify-between mb-6'>
            <Link href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Logo</span>
              <Image className='w-20' src='/assets/logowsc.png' alt='Logo' width={1000} height={500} style={{ objectFit: 'contain' }} />
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-blue-200 hover:text-blue-100 hover:bg-dark-neutral-a40 my-2 mx-1'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <div className='bg-black'>
                <div className='w-6 h-0.5 bg-dark-menu-y10 rounded-sm rotate-45 translate-y-0.5'></div>
                <div className='w-6 h-0.5 bg-dark-menu-y10 rounded-sm -rotate-45 translate-y-0'></div>
              </div>
            </button>
          </div>
          <div className='space-y-2'>
            {navigationInfo.map((item) => (
              <ul
                key={item.name}
                href={item.href}
                className='block rounded-lg py-1 leading-7 text-alert-warning-300'
              >
                <li>
                  <p className='text-lg font-semibold'>{item.name}</p>
                  {item.subMenu.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.href}
                      className='text-sm font-light block rounded-lg px-1 leading-7 text-dark-menu-y10'
                    >
                      {subItem.name}
                    </a>
                  ))}
                </li>
              </ul>
            ))}
            {navigationUser.map((item) => (
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
  )
}

export default MenuMobile;