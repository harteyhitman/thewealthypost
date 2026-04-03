'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './dashboard.module.scss';
import { fetchAllPostsAdmin, deletePost, Post } from '@/libs/api';
import { supabase } from '@/libs/supabaseClient';

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    }
  };

  const fetchPosts = async () => {
    try {
      const data = await fetchAllPostsAdmin();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await deletePost(id);
      fetchPosts();
    } catch (err: any) {
      alert('Failed to delete post: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Admin Dashboard</h1>
          <div className={styles.headerActions}>
            <Link href="/admin/posts/new" className={styles.newButton}>
              + New Post
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.postsList}>
          <h2>All Posts ({posts.length})</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td data-label="ID">{post.id}</td>
                  <td data-label="Title">{post.title}</td>
                  <td data-label="Category">{post.category || '-'}</td>
                  <td data-label="Status">
                    <span className={post.published ? styles.published : styles.draft}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td data-label="Created">{post.created_at ? new Date(post.created_at).toLocaleDateString() : '-'}</td>
                  <td data-label="Actions">
                    <div className={styles.actions}>
                      <Link href={`/admin/posts/${post.id}`} className={styles.editButton}>
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

