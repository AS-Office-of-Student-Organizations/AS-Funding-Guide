'use client';

import { useState } from 'react';
import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import './LoginForm.css';

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const validDomains = ['ucsd.edu', 'health.ucsd.edu', 'sdsc.edu', 'scripps.edu', 'eng.ucsd.edu'];

  const isValidUCSDEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    const domain = email.split('@')[1];
    return validDomains.includes(domain);
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;

      if (!isValidUCSDEmail(userEmail)) {
        await auth.signOut();
        setError('Please use your UCSD email address to sign in.');
        return;
      }

      onClose();
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('An error occurred during Google sign-in. Please try again.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    if (!isValidUCSDEmail(email)) {
      setError('Please use a valid UCSD email address (e.g., @ucsd.edu, @health.ucsd.edu)');
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please log in instead.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters long.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-title">{isSignUp ? 'Sign Up' : 'Log In'}</h2>

      <button type="button" onClick={handleGoogleSignIn} className="google-sign-in-button">
        <svg className="google-icon" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        <span>Sign in with Google</span>
      </button>

      <div className="separator">
        <span>Or continue with email</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value.toLowerCase())} placeholder="your.name@ucsd.edu" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">{isSignUp ? 'Sign Up' : 'Log In'}</button>
        <p className="toggle-form">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="toggle-button">{isSignUp ? 'Log In' : 'Sign Up'}</button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
