'use client';
import { useState } from 'react';
import { auth } from '../../pages/firebaseData';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user login succefully:', user);
        router.push('/user');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('login error:', errorCode, errorMessage);
      });
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-custom text-dark-neutral-a40'>
      <div className='bg-gradient-to-br from-alert-warning-100 to-dark-menu-y10 p-8 rounded shadow-md w-80'>
        <h2 className='text-2xl mb-4 text-center'>Login</h2>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label className='block'>Email</label>
            <input
              type='email'
              value={email}
              onChange={handleEmailChange}
              className='w-full px-3 py-2 border rounded'
              placeholder='e-mail'
              required
            />
          </div>
          <div className='mb-4'>
            <div className='flex justify-between items-end'>
              <label className='block'>Password</label>
              <button type='button' className='text-alert-info-600 text-xs hover:text-dark-accent-a20'>Forgot your password?</button>
            </div>
            <input
              type='password'
              value={password}
              onChange={handlePasswordChange}
              className='w-full px-3 py-2 border rounded text-black'
              placeholder='password'
              required
            />
          </div>
          <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
            Login
          </button>
        </form>
        <div className='flex text-sm gap-2 justify-center'>
        <p className=''> New here?</p>
        <Link href='/signup'>
          <button type='button' className='hover:text-dark-accent-a20'>Create your account now!</button>
        </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Login;