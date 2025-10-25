// components/Navigation/Navigation.tsx
'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './Navigation.module.scss';

export const Navigation: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          My Blog
        </Link>
        
        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/blog" className={styles.link}>
            Blog
          </Link>
          
          {isAuthenticated ? (
            <Link href="/admin/dashboard" className={styles.adminLink}>
              Admin Dashboard
            </Link>
          ) : (
            <Link href="/admin/login" className={styles.adminLink}>
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};