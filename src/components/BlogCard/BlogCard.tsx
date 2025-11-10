// components/BlogCard/BlogCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import styles from './BlogCard.module.scss';

interface Post {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  slug: string;
  link: string;
  
}
const directions = [
  { '--x-offset': '100px', '--y-offset': '0px' },   // from right
  { '--x-offset': '-100px', '--y-offset': '0px' },  // from left
  { '--x-offset': '0px', '--y-offset': '100px' },   // from bottom
  { '--x-offset': '0px', '--y-offset': '-100px' },  // from top
];

interface BlogCardProps {
  post: Post;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const randomDir = directions[index % directions.length];
  
  return (
    <div
      className={styles.blogCard}
      style={{
        ...randomDir,
        animationDelay: `${index * 0.2}s`, // staggered animation
      }}
    >
      <div className={styles.blogImage}>
        <img
          src={post.image}
          alt={post.title}
          className={styles.blogThumbnail}
        />
      </div>
      <div className={styles.blogContent}>
        <h3 className={styles.blogTitle}>{post.title}</h3>
        <p className={styles.blogExcerpt}>{post.excerpt}</p>
        <a href={post.link} className={styles.readMoreLink}>
          Read More →
        </a>
      </div>
    </div>
  );
}
