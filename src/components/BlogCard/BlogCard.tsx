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
  category?: string;
  date?: string;
  author?: string;
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
        {post.category && (
          <span className={styles.blogCategory}>
            {post.category}
          </span>
        )}
        <h3 className={styles.blogTitle}>{post.title}</h3>
        <p className={styles.blogExcerpt}>{post.excerpt}</p>
        <div className={styles.blogMeta}>
          {post.author && (
            <span className={styles.blogAuthor}>
              <svg className={styles.metaIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor"/>
                <path d="M8 10C4.68629 10 2 11.7909 2 14.1818V16H14V14.1818C14 11.7909 11.3137 10 8 10Z" fill="currentColor"/>
              </svg>
              {post.author}
            </span>
          )}
          {post.date && (
            <span className={styles.blogDate}>
              <svg className={styles.metaIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H13V1C13 0.447715 12.5523 0 12 0C11.4477 0 11 0.447715 11 1V2H5V1C5 0.447715 4.55228 0 4 0C3.44772 0 3 0.447715 3 1V2H2C0.895431 2 0 2.89543 0 4V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V4C16 2.89543 15.1046 2 14 2ZM14 14H2V7H14V14Z" fill="currentColor"/>
              </svg>
              {post.date}
            </span>
          )}
        </div>
        <Link href={`/blog/${post.slug}`} className={styles.readMoreLink}>
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;