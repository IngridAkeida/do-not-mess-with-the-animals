'use client'
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storage, firestore, auth } from '../../pages/firebaseData'; 
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import Image from 'next/image';

const User = () => {
  const { user, updateUserProfile } = useAuth();
  const [profileImage, setProfileImage] = useState(user?.photoURL || '');
  const [uploading, setUploading] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      if (user) {
        await updateUserProfile({
          displayName: 'Novo Nome',
          photoURL: profileImage // Use the updated profileImage state
        });
        console.log('Perfil atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao atualizar o perfil: ', error);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return; 

    const file = e.target.files?.[0] || null;
    if (!file) return;

    const storageRef = ref(storage, `profileImages/${user.uid}`);
    setUploading(true);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      await updateUserProfile({ photoURL: downloadURL }); 
      await updateDoc(doc(firestore, 'users', user.uid), { photoURL: downloadURL });

      setProfileImage(downloadURL);
    } catch (error) {
      console.error("Erro ao fazer upload da imagem: ", error);
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
      console.error("Erro ao remover a imagem: ", error);
    } finally {
      setUploading(false);
    }
  };

  console.log('user', user);
  console.log('profileImage', profileImage);

  return (
    <div className='max-w-7xl mx-auto bg-dark-primary-a20'>
      <h1>Welcome, {user?.displayName || user?.email}!</h1>
      {/* <p> User since {user?.auth.metadata.creationTime} </p> */}
      {/* <p> User since {user?.auth.metadata.lastSignInTime} </p> */}
      <div className='flex m-2'>
        <div className='w-1/6 border'>
          <div className='w-24 h-24 border rounded-full text-white'>
            {profileImage ? (
              <Image src={profileImage} alt="Profile" className='w-full h-full rounded-full' width={300} height={300} layout='fixed' />
            ) : (
              <span>No Image</span>
            )}
          </div>
          <h2>Member since 2021</h2>
          <input type="file" onChange={handleUpload} disabled={uploading} />
          <button onClick={handleRemoveImage} disabled={uploading || !profileImage}>
            Remove Image
          </button>
          <span>Edit profile</span>
          <button onClick={handleUpdateProfile}>Atualizar Perfil</button>
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
  );
};

export default User;
