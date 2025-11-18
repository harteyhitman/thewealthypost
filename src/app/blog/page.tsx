// pages/blog/index.tsx
import { getAllPosts } from '../../libs/posts-data';
import BlogGrid from '../../components/BlogGrid/BlogGrid';
import styles from './Blog.module.scss';

export default function BlogPage() {
  const posts = getAllPosts().map(post => ({
    ...post,
    image: typeof post.image === 'string' ? post.image : post.image.src,
    slug: post.slug,
  }));
  
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