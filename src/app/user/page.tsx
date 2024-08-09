'use client';
import PrivateRoute from '../../components/PrivateRoute';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../pages/firebaseData';
import Nav from '../../components/Header/Nav/Nav'

const User = () => {
  const { user } = useAuth();

  return (
    <PrivateRoute>
      <div className='max-w-7xl mx-auto bg-dark-primary-a20'>
        <Nav />
        <h1>Welcome, {user?.displayName || user?.email}!</h1>
        <div className='flex m-2'>
          <div className='w-1/6 border'>
            <div className='w-24 h-24 bg-dark-neutral-a40 rounded-full text-white'></div>
            <h1>{user?.displayName || user?.email}</h1>
            <h2>Member since 2021</h2>
            <span>Edit profile</span>
            <div>Settings</div>
            <button onClick={() => auth.signOut()}>Sign Out</button>
          </div>
          <div className='w-5/6 border'>
            Your Lists
            <div>Favorites</div>
            <div>Watchlist</div>
            <div>Watchedlist</div>
            <div>Blocklist</div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default User;
