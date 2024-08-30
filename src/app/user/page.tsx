'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storage, firestore, auth } from '../../pages/firebaseData';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { v4 } from 'uuid';

import Nav from '../../components/Header/Nav/Nav'
import Footer from '../../components/Footer/Footer'

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
      <div className='max-w-5xl h-auto mx-auto bg-gradient-to-br from-dark-primary-a30 via-dark-primary-a0 to-dark-primary-a20 flex flex-col justify-start items-center'>
        <div className='flex flex-col p-6 w-full gap-y-2'>
          <div className='flex flex-col bg-black bg-opacity-20 rounded-md p-2'>
            <div className='flex'>
              <div className='w-28 h-28 rounded-full'>
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
              <div>
                <h1 className='text-base'>Welcome, {user?.displayName || user?.email}!</h1>
                {/* <p>User since {user?.metadata.creationTime}</p>
                <p>Last Sign In {user?.metadata.lastSignInTime}</p> */}
              </div> 
            </div>
            <div>Edit Profile</div>
            <button type='button' onClick={() => auth.signOut()} className='mt-2 text-left'>
              Sign Out
            </button>
            {/* <label htmlFor='fileInput'>Upload Image:</label>
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
            </button> */}
            
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

export default User;
