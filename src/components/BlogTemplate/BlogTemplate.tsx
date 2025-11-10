import Image, { StaticImageData } from 'next/image';
import styles from './BlogTemplate.module.scss';

interface Post {
  id: number;
  slug: string;
  title: string;
  image: StaticImageData;
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
    <section className={styles.blogWrapper}>
      {/* Top bar */}
      <div className={styles.blogTopBar}>
        <span className={styles.category}>Category 1</span>
        <span className={styles.date}>{post.date}</span>
        <span className={styles.comments}>3 Comments</span>
      </div>

      <div className={styles.blogLayout}>
        {/* Main Content */}
        <article className={styles.blogMain}>
          <h1 className={styles.blogTitle}>{post.title}</h1>

          {post.image && (
            <div className={styles.blogImage}>
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

          <div className={styles.blogBody}>
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Sidebar */}
        <aside className={styles.blogSidebar}>
          <div className={styles.sidebarCard}>
            <h3>Recent Posts</h3>
            <ul>
              <li>How to Save Money Smartly</li>
              <li>5 Tips for Better Design</li>
              <li>What Makes a Website Great?</li>
            </ul>
          </div>

          <div className={styles.sidebarCard}>
            <h3>Recent Comments</h3>
            <ul>
              <li>John on Design Trends</li>
              <li>Mary on UX Psychology</li>
            </ul>
          </div>

          <div className={styles.sidebarCard}>
            <h3>Get the Latest News!</h3>
            <form>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default BlogTemplate;
