'use client';
import React, { useState } from 'react';
import { auth } from '../../pages/firebaseData';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Link from 'next/link';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfPassword(e.target.value);

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      console.error('As senhas não coincidem');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name
        }).then(() => {
          console.log('Usuário cadastrado:', user);
        }).catch((error) => {
          console.error('Erro ao atualizar o perfil do usuário:', error);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro ao cadastrar:', errorCode, errorMessage);
  });
};

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-custom text-dark-neutral-a40'>
      <div className='bg-gradient-to-br from-alert-warning-100 to-dark-menu-y10 p-8 rounded shadow-md w-80'>
        <h2 className='text-2xl mb-4 text-center'>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className='mb-4'>
            <label className='block'>Name</label>
            <input
              type='text'
              value={name}
              onChange={handleNameChange}
              className='w-full px-3 py-2 border rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block'>Email</label>
            <input
              type='email'
              value={email}
              onChange={handleEmailChange}
              className='w-full px-3 py-2 border rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block'>Password</label>
            <input
              type='password'
              value={password}
              onChange={handlePasswordChange}
              className='w-full px-3 py-2 border rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block'>Re-enter password</label>
            <input
              type='password'
              value={confPassword}
              onChange={handleConfirmPasswordChange}
              className='w-full px-3 py-2 border rounded'
              required
            />
          </div>
          <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
            Sign Up
          </button>
        </form>
        <div className='mt-4 text-center'>
        </div>
        <div className='flex text-sm gap-2 justify-center'>
          <p className=''> Already have an account?</p>
          <Link href='/login'>
            <button type='button' className='hover:text-dark-accent-a20'>Sign in</button>
          </Link>
        </div> 
      </div> 
    </div>
  );
};

export default SignUp;
