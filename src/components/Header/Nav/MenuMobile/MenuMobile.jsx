import Image from 'next/image';
import Link from 'next/link';
import { NavigationInfo, NavigationUser } from '@/components/uiComponents/MenuList/MenuList';
import { useEffect } from 'react';
import LayoutSection from '@/components/uiComponents/Layouts/LayoutSection';

const MenuMobile = ({setMobileMenuOpen}) => {
  // const [openMenu, setOpenMenu] = useState(null);
  const navigationInfo = NavigationInfo;

  const adicionalStyle = 'sm:hidden fixed inset-0 z-50 w-full px-4 py-2'

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return(
    <LayoutSection adicionalStyle={adicionalStyle}>
      <div className='flex items-center justify-between mb-6'>
        <Link href='/' className='-m-1.5 p-1.5'>
          <span className='sr-only'>Logo</span>
          <Image className='w-14' src='/assets/logowsc.png' alt='Logo' width={1000} height={500} style={{ objectFit: 'contain' }} />
        </Link>
        <button
          type='button'
          className='-m-2.5 rounded-md p-2.5 text-blue-200 hover:text-blue-100 my-2 mx-1'
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
        <div className='flex gap-2'>
          <NavigationUser />
        </div>
        <button>Logoff</button>
      </div>
    </LayoutSection>
  )
}

export default MenuMobile;