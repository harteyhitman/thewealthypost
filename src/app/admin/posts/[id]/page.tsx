'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from './edit.module.scss';

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  author?: string;
  date?: string;
  tags?: string[];
  category?: string;
  published: boolean;
}

export default function EditPost() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const isNew = postId === 'new';

  const [post, setPost] = useState<Post>({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'The Wealthy Post Team',
    date: new Date().toISOString().split('T')[0],
    tags: [],
    category: '',
    published: true,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
    if (!isNew) {
      fetchPost();
    }
  }, [postId]);

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }

      const data = await response.json();
      setPost(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('admin_token');
      const url = isNew
        ? 'http://localhost:3001/posts'
        : `http://localhost:3001/posts/${postId}`;
      const method = isNew ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
      });

      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to save post');
      }

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{isNew ? 'Create New Post' : 'Edit Post'}</h1>
        <button onClick={() => router.push('/admin/dashboard')} className={styles.cancelButton}>
          Cancel
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>Title *</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Slug *</label>
            <input
              type="text"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
              required
              placeholder="post-url-slug"
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>Category</label>
            <input
              type="text"
              value={post.category || ''}
              onChange={(e) => setPost({ ...post, category: e.target.value })}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Author</label>
            <input
              type="text"
              value={post.author || ''}
              onChange={(e) => setPost({ ...post, author: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>Date</label>
            <input
              type="date"
              value={post.date || ''}
              onChange={(e) => setPost({ ...post, date: e.target.value })}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Image URL</label>
            <input
              type="text"
              value={post.image || ''}
              onChange={(e) => setPost({ ...post, image: e.target.value })}
              placeholder="/blog posts images/image.jpg"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Excerpt *</label>
          <textarea
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            required
            rows={3}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Content (HTML) *</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            required
            rows={20}
            className={styles.contentTextarea}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={post.tags?.join(', ') || ''}
            onChange={(e) =>
              setPost({
                ...post,
                tags: e.target.value.split(',').map((tag) => tag.trim()).filter(Boolean),
              })
            }
            placeholder="tag1, tag2, tag3"
          />
        </div>

        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={post.published}
              onChange={(e) => setPost({ ...post, published: e.target.checked })}
            />
            Published
          </label>
        </div>

        <div className={styles.actions}>
          <button type="submit" disabled={saving} className={styles.saveButton}>
            {saving ? 'Saving...' : isNew ? 'Create Post' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

