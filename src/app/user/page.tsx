'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { storage, firestore, auth } from '../../pages/firebaseData';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { v4 } from 'uuid';

import Nav from '../../components/Header/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import withAuth from '../../hoc/withAuth'; // Importa o HOC

const User = () => {
  const { user, loading } = useAuth(); // Pegue o estado de loading aqui também
  const [profileImage, setProfileImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && user.photoURL) {
      setProfileImage(user.photoURL);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      await updateUserProfile({
        displayName: user.displayName,
        photoURL: profileImage,
      });
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const oldImageUrl = user.photoURL;
    const storageRef = ref(storage, `profileImages/${v4()}`);
    setUploading(true);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await updateUserProfile({ photoURL: downloadURL });
      await updateDoc(doc(firestore, 'users', user.uid), { photoURL: downloadURL });

      if (oldImageUrl) {
        const oldImageRef = ref(storage, oldImageUrl);
        await deleteObject(oldImageRef);
      }

      setProfileImage(downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!user) return;

    const storageRef = ref(storage, `profileImages/${user.uid}`);
    setUploading(true);

    try {
      await deleteObject(storageRef);
      await updateUserProfile({ photoURL: null });
      await updateDoc(doc(firestore, 'users', user.uid), { photoURL: null });

      setProfileImage('');
    } catch (error) {
      console.error('Error removing image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/'); // Redireciona para a página inicial após o logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Mostra um indicador de carregamento enquanto o usuário está sendo carregado
  }

  return (
    <div className='max-w-7xl mx-auto bg-dark-primary-a40'>
      <Nav />
      <div className='max-w-5xl h-auto mx-auto bg-gradient-to-br from-dark-primary-a30 via-dark-primary-a0 to-dark-primary-a20 flex flex-col justify-start items-center'>
        <div className='flex flex-col p-6 w-full gap-y-2'>
          <div className='flex flex-col bg-black bg-opacity-20 rounded-md p-2'>
            <div className='flex'>
              <div className='w-28 h-28 rounded-md'>
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt='Profile'
                    className='w-full h-full rounded-md'
                    width={300}
                    height={300}
                    layout='fixed'
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <div className='ml-4'>
                <h1 className='text-base'>Welcome, {user?.displayName || user?.email}!</h1>
                {/* <p>User since {user?.metadata.creationTime}</p>
                <p>Last Sign In {user?.metadata.lastSignInTime}</p> */}
              </div>
            </div>
            <div>Edit Profile</div>
            <button type='button' onClick={handleSignOut} className='mt-2 text-left'>
              Sign Out
            </button>
            <label htmlFor='fileInput'>Upload Image:</label>
            <input
              id='fileInput'
              type='file'
              onChange={handleUpload}
              disabled={uploading}
              className='mt-2'
            />
            <button
              type='button'
              onClick={handleRemoveImage}
              disabled={uploading || !profileImage}
              className='mt-2'
            >
              Remove Image
            </button>
            <button type='button' onClick={handleUpdateProfile} className='mt-2'>
              Update Profile
            </button>
          </div>
          <div className='flex flex-col gap-y-2'>
            <div className='bg-black h-40 rounded-md'>Your List</div>
            <div className='bg-black h-40 rounded-md'>Favorites</div>
            <div className='bg-black h-40 rounded-md'>Watchlist</div>
            <div className='bg-black h-40 rounded-md'>Watchedlist</div>
            <div className='bg-black h-40 rounded-md'>Blocklist</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withAuth(User);
