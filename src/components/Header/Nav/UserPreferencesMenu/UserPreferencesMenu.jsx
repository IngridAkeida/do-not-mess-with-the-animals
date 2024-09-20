import { NavigationUser } from '@/components/uiComponents/MenuList/MenuList';

const UserPreferencesMenu = () => {

  return (
    <div className='hidden sm:flex gap-x-2 lg:gap-x-6'>
      <NavigationUser />
    </div>
  );
}

export default UserPreferencesMenu;