'use client';
import React, { useState } from 'react';
import { auth } from '@/lib/firebaseData';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Nav from '@/components/Header/Nav/Nav';
import Link from 'next/link';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfPassword(e.target.value);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasSpecialChar;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Invalid email. Check email format.');
      return;
    }

    if (password !== confPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!validatePassword(password)) {
      setError('The password must contain at least one capital letter and one special character.');
      return;
    }

    setError(''); 

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name
        }).then(() => {
          console.log('Usuário cadastrado:', user);
        }).catch((error) => {
          console.error('Erro ao atualizar o perfil do usuário:', error);
          setError('Erro ao atualizar o perfil do usuário. Por favor, tente novamente.');
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro ao cadastrar:', errorCode, errorMessage);
        setError('Erro ao cadastrar. Verifique suas informações e tente novamente.');
      });
  };

  return (
    <div className='max-w-7xl mx-auto bg-dark-primary-a40'>
      <Nav />
      <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-dark-primary-a30 via-dark-primary-a20 to-dark-primary-a30 text-dark-neutral-a40'>
        <div className='bg-dark-accent-a40 p-8 rounded shadow-md w-80 border border-dark-menu-y10'>
          <h2 className='text-2xl mb-4 text-center font-extrabold text-dark-menu-y10'>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className='mb-4'>
              <label className='block font-bold text-dark-menu-y10'>Name</label>
              <input
                type='text'
                value={name}
                onChange={handleNameChange}
                className='w-full px-3 py-2 border rounded'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block font-bold text-dark-menu-y10'>Email</label>
              <input
                type='email'
                value={email}
                onChange={handleEmailChange}
                className='w-full px-3 py-2 border rounded'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block font-bold text-dark-menu-y10'>Password</label>
              <input
                type='password'
                value={password}
                onChange={handlePasswordChange}
                className='w-full px-3 py-2 border rounded'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block font-bold text-dark-menu-y10'>Re-enter password</label>
              <input
                type='password'
                value={confPassword}
                onChange={handleConfirmPasswordChange}
                className='w-full px-3 py-2 border rounded'
                required
              />
            </div>
            {error && (
              <div className='mb-4 text-red-500 text-center'>
                {error}
              </div>
            )}
            <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
              Sign Up
            </button>
          </form>
          <div className='flex text-sm gap-2 justify-center mt-1'>
            <p className='text-white'> Already have an account?</p>
            <Link href='/login'>
              <button type='button' className='text-white font-semibold hover:text-dark-menu-y10'>Sign in</button>
            </Link>
          </div> 
        </div> 
      </div>
    </div>
  );
};

export default SignUp;
