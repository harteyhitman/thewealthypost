// components/AdminDashboard/PostForm.tsx
'use client';
import { useState, useEffect } from 'react';
import { BlogPost, CreateBlogPostDto } from '@/types/blog';
import styles from './AdminDashboard.module.scss';

interface PostFormProps {
  post?: BlogPost;
  onSubmitAction: (data: CreateBlogPostDto) => void;
  onCancelAction: () => void;
}

export const PostForm: React.FC<PostFormProps> = ({ post, onSubmitAction, onCancelAction }) => {
  const [formData, setFormData] = useState<CreateBlogPostDto>({
    title: '',
    content: '',
    tags: '',
    slug: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        tags: post.tags || '',
        slug: post.slug || '',
      });
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmitAction(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2>{post ? 'Edit Post' : 'Create New Post'}</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="slug" className={styles.label}>
              Slug
            </label>
            <div className={styles.slugGroup}>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className={styles.input}
                placeholder="URL-friendly version"
              />
              <button
                type="button"
                onClick={generateSlug}
                className={styles.generateSlugButton}
                disabled={!formData.title}
              >
                Generate
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content" className={styles.label}>
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className={styles.textarea}
              rows={8}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tags" className={styles.label}>
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className={styles.input}
              placeholder="comma, separated, tags"
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onCancelAction}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || !formData.title || !formData.content}
            >
              {isSubmitting ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};