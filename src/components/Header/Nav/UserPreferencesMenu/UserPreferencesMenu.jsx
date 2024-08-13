import { NavigationUser } from '../../../uiComponents/MenuList/MenuList';

const UserPreferencesMenu = () => {
const navigationUser = NavigationUser;

  return (
    <div className='hidden sm:flex gap-x-2 lg:gap-x-6'>
      {navigationUser.map((item) => (
        <a key={item.name} href={item.href} className='text-xl font-semibold text-alert-danger-100 hover:text-dark-menu-y10 hover:bg-dark-neutral-a40 my-auto'>
          {item.name}
        </a>
      ))}
    </div>
  );
}

export default UserPreferencesMenu;