// components/BlogGrid/BlogGrid.tsx
import BlogCard from '../BlogCard/BlogCard';
import styles from './BlogGrid.module.scss';

interface Post {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  slug: string;
  link: string;
}

interface BlogGridProps {
  posts: Post[];
}

const BlogGrid = ({ posts }: BlogGridProps) => {
  return (
    <div className={styles.blogGrid}>
      {posts.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
};

export default BlogGrid;