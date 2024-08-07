'use client';
import PrivateRoute from '../../components/PrivateRoute';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../pages/firebaseData';
import Nav from '../../components/Header/Nav/Nav'

const User = () => {
  const { user } = useAuth();

  return (
    <PrivateRoute>
      <div className='max-w-7xl mx-auto bg-dark-neutral-a50'>
        <Nav />
        <h1>Welcome, {user?.displayName || user?.email}!</h1>
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
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
    </PrivateRoute>
  );
};

export default User;
