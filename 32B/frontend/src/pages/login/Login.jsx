import React, { useState } from 'react';
import { loginUserApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import './Login.css';
import backgroundImage from './bg.jpg'; // Ensure you have this image in the correct path
import logo from './logo.png'; // Ensure you have this image in the correct path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validation = () => {
    let isValid = true;

    if (email === '' || !email.includes('@')) {
      setEmailError('Email is empty or invalid');
      isValid = false;
    }
    if (password.trim() === '') {
      setPasswordError('Password is empty');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    loginUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);

        localStorage.setItem('token', res.data.token);
        const convertedData = JSON.stringify(res.data.userData);
        localStorage.setItem('user', convertedData);

        window.location.href = '/dashboard'; // Redirect to dashboard or another page
      }
    });
  };

  return (
    <div className='login-container' style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='login-content'>
        <img src={logo} alt="Logo" className="login-logo" />
        <h1>Login to your Account!</h1>
        <form className='login-form'>
          <label>Enter your Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='form-control' placeholder='Enter your email address' />
          {emailError && <p className='text-danger'>{emailError}</p>}

          <label className='mt-2'>Enter your Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='form-control' placeholder='Enter your password' />
          {passwordError && <p className='text-danger'>{passwordError}</p>}

          <button onClick={handleLogin} className='btn btn-primary w-100 mt-3'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
