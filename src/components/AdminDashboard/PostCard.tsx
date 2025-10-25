// components/AdminDashboard/PostCard.tsx
import { BlogPost } from '@/types/blog';
import styles from './AdminDashboard.module.scss';

interface PostCardProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <div className={styles.postActions}>
          <button
            onClick={() => onEdit(post)}
            className={styles.editButton}
            title="Edit post"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className={styles.deleteButton}
            title="Delete post"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className={styles.postContent}>
        <p className={styles.postExcerpt}>
          {post.content.substring(0, 150)}...
        </p>
      </div>

      <div className={styles.postFooter}>
        <div className={styles.postMeta}>
          <span className={styles.postDate}>
            Created: {formatDate(post.createdAt)}
          </span>
          {post.tags && (
            <span className={styles.postTags}>
              Tags: {post.tags}
            </span>
          )}
        </div>
        {post.slug && (
          <div className={styles.postSlug}>
            Slug: {post.slug}
          </div>
        )}
      </div>
    </div>
  );
};