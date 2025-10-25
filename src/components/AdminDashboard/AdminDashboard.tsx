// components/AdminDashboard/AdminDashboard.tsx
'use client';
import { useState, useEffect } from 'react';
import { AdminLogout } from '../AdminLogout/AdminLogout';
import { BlogPost, CreateBlogPostDto } from '@/types/blog';
import { apiService } from '@/services/api';
import styles from './AdminDashboard.module.scss';
import { PostCard } from './PostCard';
import { PostForm } from './PostForm';

export const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const postsData = await apiService.getBlogPosts();
      setPosts(postsData);
    } catch (error) {
      setError('Failed to load posts');
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (postData: CreateBlogPostDto) => {
    try {
      await apiService.createBlogPost(postData);
      setShowCreateForm(false);
      loadPosts(); // Reload posts
    } catch (error) {
      setError('Failed to create post');
      console.error('Error creating post:', error);
    }
  };

  const handleUpdatePost = async (id: number, postData: CreateBlogPostDto) => {
    try {
      await apiService.updateBlogPost(id, postData);
      setEditingPost(null);
      loadPosts(); // Reload posts
    } catch (error) {
      setError('Failed to update post');
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await apiService.deleteBlogPost(id);
        loadPosts(); // Reload posts
      } catch (error) {
        setError('Failed to delete post');
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Blog Admin Dashboard</h1>
        <AdminLogout />
      </header>

      <div className={styles.content}>
        <div className={styles.actions}>
          <button
            onClick={() => setShowCreateForm(true)}
            className={styles.primaryButton}
          >
            + Create New Post
          </button>
        </div>

        {error && (
          <div className={styles.error}>
            {error}
            <button onClick={() => setError('')} className={styles.closeError}>
              ×
            </button>
          </div>
        )}

        {showCreateForm && (
          <PostForm
            onSubmitAction={handleCreatePost}
            onCancelAction={() => setShowCreateForm(false)}
          />
        )}

        {editingPost && (
          <PostForm
            post={editingPost}
            onSubmitAction={(data) => handleUpdatePost(editingPost.id, data)}
            onCancelAction={() => setEditingPost(null)}
          />
        )}

        <div className={styles.postsSection}>
          <h2>Blog Posts</h2>
          {isLoading ? (
            <div className={styles.loading}>Loading posts...</div>
          ) : (
            <div className={styles.postsGrid}>
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onEdit={setEditingPost}
                  onDelete={handleDeletePost}
                />
              ))}
              {posts.length === 0 && (
                <div className={styles.noPosts}>
                  No blog posts found. Create your first post!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};