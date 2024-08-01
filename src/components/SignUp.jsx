'use client';
// src/components/SignUp.js
import React, { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfPassword(e.target.value);

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confPassword);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-80'>
        <h2 className='text-2xl mb-4 text-center text-black'>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Name</label>
            <input
              type='text'
              value={name}
              onChange={handleNameChange}
              className='w-full px-3 py-2 border rounded text-black'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input
              type='email'
              value={email}
              onChange={handleEmailChange}
              className='w-full px-3 py-2 border rounded text-black'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Password</label>
            <input
              type='password'
              value={password}
              onChange={handlePasswordChange}
              className='w-full px-3 py-2 border rounded text-black'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Re-enter password</label>
            <input
              type='password'
              value={confPassword}
              onChange={handleConfirmPasswordChange}
              className='w-full px-3 py-2 border rounded text-black'
              required
            />
          </div>
          <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
            Sign Up
          </button>
        </form>
        <div className='mt-4 text-center'>
        </div>
        <p className='text-black'>Already have an account? Sign in</p>
      </div> 
    </div>
  );
};

export default SignUp;
