// components/AdminLogout/AdminLogout.tsx
'use client';
import { useAuth } from '@/contexts/AuthContext';
import styles from './AdminLogout.module.scss';

interface AdminLogoutProps {
  className?: string;
}

export const AdminLogout: React.FC<AdminLogoutProps> = ({ className = '' }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className={`${styles.logoutContainer} ${className}`}>
      <span className={styles.userInfo}>Welcome, {user?.username}</span>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};