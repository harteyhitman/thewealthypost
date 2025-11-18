// components/BlogCard/BlogCard.tsx - SIMPLIFIED VERSION
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
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  // Calculate animation delay based on index for staggering effect
  const animationDelay = `${index * 0.1}s`;

  return (
    <div 
      className={styles.blogCard}
      style={{
        animationDelay,
      }}
    >
      <div className={styles.blogImage}>
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={250}
          className={styles.blogThumbnail}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
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