'use client';
import { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleBankIDSignIn = () => {
    console.log('BankID sign-in');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-80'>
        <h2 className='text-2xl mb-4 text-center text-black'>Sign In</h2>
        <form onSubmit={handleSignIn}>
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
          <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
            Sign In
          </button>
        </form>
        <div className='mt-4 text-center'>
          <button onClick={handleBankIDSignIn} className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600'>
            Sign In with BankID
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;