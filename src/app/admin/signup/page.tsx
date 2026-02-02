'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './signup.module.scss';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { getApiUrl } from '@/libs/api';

export default function AdminSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${getApiUrl()}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error(data.message || 'Username or email already exists');
        }
        throw new Error(data.message || 'Signup failed');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Account Created</h1>
          <p className={styles.subtitle}>
            Account created successfully. You can log in now.
          </p>
          <div className={styles.footer}>
            <Link href="/admin/login" className={styles.linkButton}>
              Log in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Admin Signup</h1>
        <p className={styles.subtitle}>Create your admin account</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSignup} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
                disabled={loading}
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.passwordWrapper}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                minLength={6}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.passwordToggle}
                disabled={loading}
              >
                {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Already have an account?{' '}
            <Link href="/admin/login" className={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}