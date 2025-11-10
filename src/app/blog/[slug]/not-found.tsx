// app/blog/[slug]/not-found.tsx
import Link from 'next/link';
import styles from '../BlogPost.module.scss'

export default function NotFound() {
  return (
    <div className={styles.error}>
      <h2>Post Not Found</h2>
      <p>The blog post you're looking for doesn't exist.</p>
      <Link href="/blog" className={styles.backButton}>
        Back to Blog
      </Link>
    </div>
  );
}