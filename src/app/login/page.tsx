'use client';
import { useState } from 'react';
import { auth } from '@/lib/firebaseData';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LayoutForm from '@/components/uiComponents/LayoutContainer/LayoutForm';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError('Email format is incorrect.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User login successfully:', user);
        router.push('/user');
        setError(null);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode.includes('wrong-password')) {
          setError('The password is incorrect.');
        } else if (errorCode.includes('user-not-found')) {
          setError('No user found with this email.');
        } else {
          setError('An error occurred. Please try again.');
        }

        console.error('Login error:', errorCode, errorMessage);
      });
  };

  return (
    <LayoutForm>
      <h2 className='text-2xl mb-4 text-center font-extrabold text-dark-menu-y10'>
        Login
      </h2>
      <form onSubmit={handleLogin}>
        <div className='mb-4'>
          <label className='block font-bold text-dark-menu-y10'>
            Email
          </label>
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
            <label className='block font-bold text-dark-menu-y10'>
              Password
            </label>
            <button
              type='button'
              className='text-white font-semibold pb-0.5 text-xs hover:text-dark-menu-y10'
            >
              Forgot your password?
            </button>
          </div>
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            className='w-full px-3 py-2 border rounded text-white'
            placeholder='password'
            required
          />
        </div>
        {error && (
          <div className='mb-4 text-red-500 text-center'>{error}</div>
        )}
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          Login
        </button>
      </form>
      <div className='flex text-sm gap-2 justify-center mt-1'>
        <p className='text-white'> New here?</p>
        <Link href='/signup'>
          <button
            type='button'
            className='text-white font-semibold hover:text-dark-menu-y10'
          >
            Create your account now!
          </button>
        </Link>
      </div>
    </LayoutForm>
  );
};

export default Login;
