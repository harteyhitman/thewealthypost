// pages/blog/index.tsx
import { getAllMergedPosts } from '../../libs/posts-utils';
import BlogGrid from '../../components/BlogGrid/BlogGrid';
import styles from './Blog.module.scss';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
  // Get merged posts (static + API)
  const posts = await getAllMergedPosts();
  
  return (
    <div className={styles.blogPage}>
      <div className={styles.blogHeader}>
        <h1 className={styles.pageTitle}>Get exclusive wealth creation secrets</h1>
        <p className={styles.imageCredit}>
          Join over 30,000+ others who has gotten insight from my blog where I share the secrets to creating modern wealth 👇
        </p>
      </div>
      <BlogGrid posts={posts} itemsPerPage={9} />
    </div>
  );
}