'use client';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário logado:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro ao logar:', errorCode, errorMessage);
      });
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-80'>
        <h2 className='text-2xl mb-4 text-center text-black'>Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input
              type='email'
              value={email}
              onChange={handleEmailChange}
              className='w-full px-3 py-2 border rounded text-black'
              placeholder='e-mail'
              required
            />
          </div>
          <div className='mb-4'>
            <div className='flex justify-between items-end'>
              <label className='block text-gray-700'>Password</label>
              <p className='text-blue-600 text-xs'>Forgot your password?</p>
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
        <p className='text-black'> New here?</p>
        <p className='text-black'> Create your account now!</p>
      </div>
    </div>
  );
};

export default Login;