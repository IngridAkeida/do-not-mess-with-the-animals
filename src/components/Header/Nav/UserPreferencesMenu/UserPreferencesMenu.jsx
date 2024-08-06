import { NavigationUser } from '../../../uiComponents/MenuList/MenuList';

const UserPreferencesMenu = () => {
const navigationUser = NavigationUser;

  return (
    <div className='hidden sm:flex lg:gap-x-12'>
      {navigationUser.map((item) => (
        <a key={item.name} href={item.href} className='text-sm font-semibold leading-6 text-blue-200 hover:text-blue-100 hover:bg-dark-neutral-a40 my-2 mx-1'>
          {item.name}
        </a>
      ))}
    </div>
  );
}

export default UserPreferencesMenu;