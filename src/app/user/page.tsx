'use client';
import PrivateRoute from '../../components/PrivateRoute';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../path/to/firebaseConfig';

const User = () => {
  return (
    <PrivateRoute>
      <div className='text-black'>
        <div className='flex-col m-4'>
          <div className='w-24 h-24 bg-dark-neutral-a40 rounded-full text-white'>Image here</div>
          <h1>Joe Doe</h1>
          <span>Edit profile</span>
        </div>
        <div>
          <div>Favorites</div>
          <div>Watchlist</div>
          <div>Watchedlist</div>
          <div>Blocklist</div>
          <div>Settings</div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default User;
