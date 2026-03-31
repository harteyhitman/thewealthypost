'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './signup.module.scss';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { supabase } from '@/libs/supabaseClient';

export default function AdminSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

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
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/login`,
        },
      });

      if (authError) {
        throw authError;
      }

      setVerificationStep(true);
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: verificationCode,
        type: 'signup',
      });

      if (verifyError) {
        throw verifyError;
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Account Verified</h1>
          <p className={styles.subtitle}>
            Your account has been verified successfully. You can log in now.
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

  if (verificationStep) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Verify Email</h1>
          <p className={styles.subtitle}>
            Enter the 6-digit confirmation code sent to {formData.email}
          </p>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleVerify} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="code">Confirmation Code</label>
              <input
                id="code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                disabled={loading}
                placeholder="123456"
                maxLength={6}
              />
            </div>

            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Verifying...' : 'Verify Account'}
            </button>
          </form>

          <div className={styles.footer}>
            <button
              onClick={() => setVerificationStep(false)}
              className={styles.link}
              disabled={loading}
            >
              Back to Signup
            </button>
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