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
}

interface BlogCardProps {
  post: Post;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className={styles.blogCard}>
      <div className={styles.blogImage}>
        <Image
          src={post.image}
          alt={post.title}
          width={300}
          height={200}
          className={styles.blogThumbnail}
        />
      </div>
      <div className={styles.blogContent}>
        <h3 className={styles.blogTitle}>{post.title}</h3>
        <p className={styles.blogExcerpt}>{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className={styles.readMoreLink}>
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;