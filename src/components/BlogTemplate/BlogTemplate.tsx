import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import styles from './BlogTemplate.module.scss';
import { getAllPosts } from '@/libs/posts-data';

interface Post {
  id: number;
  slug: string;
  title: string;
  image: StaticImageData;
  content: string;
  author?: string;
  date?: string;
  tags?: string[];
  excerpt?: string;
}

interface BlogTemplateProps {
  post: Post;
}

const BlogTemplate = ({ post }: BlogTemplateProps) => {
  // Get recent posts for sidebar (excluding current post)
  const recentPosts = getAllPosts()
    .filter(p => p.id !== post.id)
    .slice(0, 5);

  return (
    <section className={styles.blogWrapper}>
      <div className={styles.blogContainer}>
      {/* Top bar */}
      <div className={styles.blogTopBar}>
          <span className={styles.category}>Finance</span>
          {post.date && <span className={styles.date}>{post.date}</span>}
          {post.author && <span className={styles.author}>By {post.author}</span>}
      </div>

      <div className={styles.blogLayout}>
        {/* Main Content */}
        <article className={styles.blogMain}>
          <h1 className={styles.blogTitle}>{post.title}</h1>

            {post.excerpt && (
              <p className={styles.blogExcerpt}>{post.excerpt}</p>
            )}

          {post.image && (
            <div className={styles.blogImage}>
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                  height={450}
                className={styles.featuredImage}
                priority
              />
            </div>
          )}

          <div className={styles.blogBody}>
            <div
                className={styles.blogContent}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className={styles.blogTags}>
                {post.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
        </article>

        {/* Sidebar */}
        <aside className={styles.blogSidebar}>
          <div className={styles.sidebarCard}>
            <h3>Recent Posts</h3>
            <ul>
                {recentPosts.map((recentPost) => (
                  <li key={recentPost.id}>
                    <Link href={`/blog/${recentPost.slug}`}>{recentPost.title}</Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className={styles.sidebarCard}>
              <h3>Subscribe to Our Newsletter</h3>
              <p className={styles.sidebarDescription}>
                Get the latest financial tips and insights delivered to your inbox.
              </p>
              <form className={styles.subscribeForm}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>

            {post.tags && post.tags.length > 0 && (
              <div className={styles.sidebarCard}>
                <h3>Related Topics</h3>
                <div className={styles.tagCloud}>
                  {post.tags.map((tag, index) => (
                    <span key={index} className={styles.sidebarTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogTemplate;
