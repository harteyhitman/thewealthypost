'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.scss';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { supabase, getRedirectUrl } from '@/libs/supabaseClient';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${getRedirectUrl()}/admin/dashboard`,
        },
      });

      if (otpError) {
        throw otpError;
      }

      setOtpSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send login code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: 'email', // Changed from magiclink to email for code verification
      });

      if (verifyError) {
        throw verifyError;
      }

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid or expired code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Admin Login</h1>
        <p className={styles.subtitle}>The Wealthy Post Admin Dashboard</p>

        <div className={styles.methodToggle}>
          <button
            className={`${styles.toggleBtn} ${loginMethod === 'password' ? styles.active : ''}`}
            onClick={() => {
              setLoginMethod('password');
              setOtpSent(false);
              setError('');
            }}
            disabled={loading}
          >
            Password
          </button>
          <button
            className={`${styles.toggleBtn} ${loginMethod === 'otp' ? styles.active : ''}`}
            onClick={() => {
              setLoginMethod('otp');
              setOtpSent(false);
              setError('');
            }}
            disabled={loading}
          >
            Email Code
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {loginMethod === 'password' ? (
          <form onSubmit={handlePasswordLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="admin@example.com"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : !otpSent ? (
          <form onSubmit={handleSendOtp} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="admin@example.com"
              />
            </div>
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Sending code...' : 'Send Login Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="otpCode">Verification Code</label>
              <input
                id="otpCode"
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required
                disabled={loading}
                placeholder="123456"
                maxLength={6}
              />
            </div>
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className={styles.resendBtn}
              disabled={loading}
            >
              Change Email
            </button>
          </form>
        )}

        <div className={styles.footer}>
          <p>
            Don't have an account?{' '}
            <Link href="/admin/signup" className={styles.link}>
              Sign up
            </Link>
          </p>
        </div>

        {/* <div className={styles.info}>
          <p>Default credentials:</p>
          <p>Username: <strong>admin</strong></p>
          <p>Password: <strong>admin123</strong></p>
        </div> */}
      </div>
    </div>
  );
}

