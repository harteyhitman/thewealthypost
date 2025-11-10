// pages/blog/index.jsx
import { getAllPosts } from '@/libs/posts-data';
import BlogGrid from '../../components/BlogGrid/BlogGrid';
import styles from './Blog.module.scss';

// Sample data - replace with your actual data source
// const samplePosts = [
//   {
//     id: 1,
//     slug: 'post-1-headline',
//     title: 'Post 1 Headline',
//     excerpt: 'Sample small text. Lorem ipsum dolor sit amet consectetur adipiscing elit...',
//     image: '/images/post1.jpg',
//   },
//   {
//     id: 2,
//     slug: 'post-2-headline',
//     title: 'Post 2 Headline',
//     excerpt: 'Sample small text. Lorem ipsum dolor sit amet consectetur adipiscing elit...',
//     image: '/images/post2.jpg',
//   },
//   {
//     id: 3,
//     slug: 'post-3-headline',
//     title: 'Post 3 Headline',
//     excerpt: 'Sample small text. Lorem ipsum dolor sit amet consectetur adipiscing elit...',
//     image: '/images/post3.jpg',
//   },
// ];

export default function BlogPage() {
  const posts = getAllPosts();
  
  return (
    <div className={styles.blogPage}>
      <div className={styles.blogHeader}>
        <h1 className={styles.pageTitle}>Blog Posts</h1>
        <p className={styles.imageCredit}>Images from Freepik</p>
      </div>
      <BlogGrid posts={posts} />
    </div>
  );
}