// app/blog/[slug]/not-found.tsx
import Link from 'next/link';
import styles from '../BlogPost.module.scss'

export default function NotFound() {
  return (
    <div className={styles.error}>
   <div>
      <h2>Not Found</h2>
      <p>Could not find the requested blog post.</p>
      <p>
        The post you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
    </div>
      <Link href="/blog" className={styles.backButton}>
        Back to Blog
      </Link>
    </div>
  );
}