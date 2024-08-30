'use client';
import { useState } from 'react';
import { auth } from '../../pages/firebaseData';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Nav from '../../components/Header/Nav/Nav';
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
    <div className='max-w-7xl mx-auto bg-dark-primary-a40'>
      <Nav />
      <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-dark-primary-a30 via-dark-primary-a20 to-dark-primary-a30 text-dark-neutral-a40'>
        <div className='bg-dark-accent-a40 p-8 rounded shadow-md w-80 border border-dark-menu-y10'>
          <h2 className='text-2xl mb-4 text-center font-extrabold text-dark-menu-y10'>Login</h2>
          <form onSubmit={handleLogin}>
            <div className='mb-4'>
              <label className='block font-bold text-dark-menu-y10'>Email</label>
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
                <label className='block font-bold text-dark-menu-y10'>Password</label>
                <button type='button' className='text-white font-semibold pb-0.5 text-xs hover:text-dark-menu-y10'>Forgot your password?</button>
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
          <div className='flex text-sm gap-2 justify-center mt-1'>
          <p className='text-white'> New here?</p>
          <Link href='/signup'>
            <button type='button' className='text-white font-semibold hover:text-dark-menu-y10'>Create your account now!</button>
          </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;