// components/AdminAuth/AdminAuth.tsx
'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/api';
import styles from './AdminLogin.module.scss';

type AuthMode = 'login' | 'register';

export const AdminAuth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        setIsLoading(false);
        return;
      }
    }

    try {
      if (mode === 'login') {
        // Use your API service for login
        const result = await apiService.login(username, password);
        login(result.access_token, result.user);
        router.push('/admin/dashboard');
      } else {
        // Use your API service for register
        await apiService.register(username, password);
        setError('Registration successful! Please login.');
        setMode('login');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message || `Failed to ${mode}`);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>
          {mode === 'login' ? 'Admin Login' : 'Create Admin Account'}
        </h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              required
              disabled={isLoading}
              placeholder="Enter username"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
              disabled={isLoading}
              placeholder={mode === 'login' ? 'Enter password' : 'Enter password (min 6 characters)'}
            />
          </div>

          {mode === 'register' && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                required
                disabled={isLoading}
                placeholder="Confirm your password"
              />
            </div>
          )}

          {error && (
            <div className={`${styles.message} ${error.includes('successful') ? styles.success : styles.error}`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Register')}
          </button>
        </form>

        <div className={styles.switchMode}>
          <p>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={switchMode}
              className={styles.switchButton}
            >
              {mode === 'login' ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>

        {/* Update this info message */}
        <div className={styles.backendInfo}>
          <p>Make sure your NestJS backend is running on http://localhost:4000</p>
        </div>
      </div>
    </div>
  );
};