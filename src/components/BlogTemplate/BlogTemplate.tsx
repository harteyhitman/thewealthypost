// components/BlogTemplate/BlogTemplate.tsx
import Image from 'next/image';
import styles from './BlogTemplate.module.scss';

interface Post {
  id: number;
  slug: string;
  title: string;
  image: string;
  content: string;
  author?: string;
  date?: string;
  tags?: string[];
}

interface BlogTemplateProps {
  post: Post;
}

const BlogTemplate = ({ post }: BlogTemplateProps) => {
  return (
    <article className={styles.blogTemplate}>
      <header className={styles.blogHeader}>
        <h1 className={styles.blogTemplateTitle}>{post.title}</h1>
        
        {post.image && (
          <div className={styles.blogTemplateImage}>
            <Image 
              src={post.image} 
              alt={post.title}
              width={800}
              height={400}
              className={styles.featuredImage}
              priority
            />
          </div>
        )}
        
        <div className={styles.blogMeta}>
          {post.author && <span className={styles.author}>By {post.author}</span>}
          {post.date && <span className={styles.date}>{post.date}</span>}
        </div>
      </header>
      
      <div className={styles.blogContent}>
        {post.content ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <p>Content coming soon...</p>
        )}
      </div>
      
      <footer className={styles.blogFooter}>
        {post.tags && post.tags.length > 0 && (
          <div className={styles.blogTags}>
            {post.tags.map(tag => (
              <span key={tag} className={styles.tag}>#{tag}</span>
            ))}
          </div>
        )}
      </footer>
    </article>
  );
};

export default BlogTemplate;