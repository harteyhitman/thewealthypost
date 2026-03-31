'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { HiUpload, HiX, HiPhotograph } from 'react-icons/hi';
import styles from './edit.module.scss';
import { fetchPostById, createPost, updatePost, uploadImage, Post } from '@/libs/api';
import { supabase } from '@/libs/supabaseClient';

export default function EditPost() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const isNew = postId === 'new';

  const [post, setPost] = useState<Post>({
    id: 0,
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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    checkAuth();
    if (!isNew) {
      fetchPost();
    }
  }, [postId]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    }
  };

  const fetchPost = async () => {
    try {
      const data = await fetchPostById(postId);
      if (data) {
        setPost(data);
        if (data.image) {
          setImagePreview(data.image);
        }
      } else {
        setError('Post not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleFile = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.match(/^image\/(jpg|jpeg|png|gif|webp)$/)) {
      setError('Please upload a valid image file (JPG, PNG, GIF, or WEBP)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setUploadingImage(true);
    setError('');

    try {
      const publicUrl = await uploadImage(file);
      setImagePreview(publicUrl);
      setPost({ ...post, image: publicUrl });
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      // Create a copy of post without id if it's new
      const postData = { ...post };
      if (isNew) {
        delete (postData as any).id;
      }

      if (isNew) {
        await createPost(postData);
      } else {
        await updatePost(postId, postData);
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
            <label>Featured Image</label>
            <div className={styles.imageUploadContainer}>
              {imagePreview ? (
                <div className={styles.imagePreviewWrapper}>
                  <div className={styles.imagePreview}>
                    <img 
                      src={imagePreview} 
                      alt="Preview"
                      onError={(e) => {
                        console.error('Image failed to load:', imagePreview);
                        // If it's a server path with spaces, try encoding them
                        if (!imagePreview.startsWith('blob:') && imagePreview.includes(' ')) {
                          e.currentTarget.src = imagePreview.replace(/ /g, '%20');
                        } else if (imagePreview.includes('%20')) {
                          // Try decoding if it's already encoded
                          e.currentTarget.src = decodeURIComponent(imagePreview);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPost({ ...post, image: '' });
                        setImagePreview(null);
                      }}
                      className={styles.removeImageButton}
                      aria-label="Remove image"
                    >
                      <HiX />
                    </button>
                  </div>
                  <div className={styles.imageInfo}>
                    <span className={styles.imagePath}>{post.image}</span>
                    <label htmlFor="imageUpload" className={styles.changeImageButton}>
                      <HiUpload />
                      Change Image
                    </label>
                  </div>
                </div>
              ) : (
                <div 
                  className={`${styles.uploadArea} ${isDragging ? styles.dragging : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleImageUpload}
                    className={styles.fileInput}
                    disabled={uploadingImage}
                  />
                  <label htmlFor="imageUpload" className={styles.uploadLabel}>
                    {uploadingImage ? (
                      <div className={styles.uploadingState}>
                        <div className={styles.spinner}></div>
                        <span>Uploading...</span>
                      </div>
                    ) : (
                      <div className={styles.uploadContent}>
                        <HiPhotograph className={styles.uploadIcon} />
                        <div className={styles.uploadText}>
                          <strong>Click to upload</strong> or drag and drop
                        </div>
                        <div className={styles.uploadSubtext}>
                          PNG, JPG, GIF or WEBP (MAX. 5MB)
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              )}
              {post.image && !imagePreview && (
                <div className={styles.imageUrlInput}>
                  <input
                    type="text"
                    value={post.image}
                    onChange={(e) => setPost({ ...post, image: e.target.value })}
                    placeholder="/blog posts images/image.jpg"
                  />
                  <span className={styles.imageUrlNote}>Or enter image URL manually</span>
                </div>
              )}
            </div>
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

