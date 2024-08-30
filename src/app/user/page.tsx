'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storage, firestore, auth } from '../../pages/firebaseData';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { v4 } from 'uuid';

import Nav from '../../components/Header/Nav/Nav'

const User = () => {
  const { user, updateUserProfile } = useAuth();
  const [profileImage, setProfileImage] = useState(user?.photoURL || '');
  const [uploading, setUploading] = useState(false);

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      await updateUserProfile({
        displayName: 'Ingrid Sanches',
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
      // Upload the new image
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Update the user's profile with the new image URL
      await updateUserProfile({ photoURL: downloadURL });
      await updateDoc(doc(firestore, 'users', user.uid), { photoURL: downloadURL });

      // Delete the old image from Firebase Storage if it exists
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
      // Delete the current image
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

  useEffect(() => {
    if (user?.photoURL) {
      setProfileImage(user.photoURL);
    }
  }, [user]);

  return (
    <div className='max-w-7xl mx-auto bg-dark-primary-a40'>
      <Nav />
      <div className='max-w-4xl mx-auto bg-gradient-to-br from-dark-primary-a30 to-dark-primary-a0 flex flex-col justify-center items-center'>
        <h1>Welcome, {user?.displayName || user?.email}!</h1>
        <p>User since {user?.metadata.creationTime}</p>
        <p>Last Sign In {user?.metadata.lastSignInTime}</p>
        <div className='flex m-2'>
          <div className='w-1/6 '>
            <div className='w-24 h-24  rounded-full text-white'>
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt='Profile'
                  className='w-full h-full rounded-full'
                  width={1800}
                  height={1800}
                  layout='fixed'
                />
              ) : (
                <span>No Image</span>
              )}
            </div>
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
            <button type='button' onClick={() => auth.signOut()} className='mt-2'>
              Sign Out
            </button>
          </div>
          <div className='w-5/6 '>
            <div>Your Lists</div>
            <div>Favorites</div>
            <div>Watchlist</div>
            <div>Watchedlist</div>
            <div>Blocklist</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
