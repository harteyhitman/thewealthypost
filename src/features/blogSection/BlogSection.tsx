"use client";
import Image from "next/image";
import styles from "./BlogSection.module.scss";
import Splash from '../../../public/splash.jpg'
const blogPosts = [
  {
    id: 1,
    title: "Budgeting Basics",
    excerpt: 'Investing in Index Funds for Beginners',
    excerpt1: 'Is Now a Good Time to Invest in Stocks?',
    excerpt2: 'Bonds vs Mutual Funds: Everything You Need to Know',
    image: Splash,
    link: "#",
  },

  {
    id: 2,
    title: "Debt Management",
    excerpt: "How to Pay Off Debt Fast Even on a Low Income",
    excerpt1: "Debt Avalanche vs Debt Snowball: What is the Best Way to Pay Off Debt",
    excerpt2: "14 Common Mistakes to Avoid When Paying Off Debt",
    image: Splash,
    link: "#",
  },
  {
    id: 3,
    title: "Saving & Emergency Funds",
    excerpt: "Emergency Fund: Everything You Need to Know",
    excerpt1: "Money-Saving Hacks: 15 Ways to Boost Your Savings",
    excerpt2: "Sinking Fund: Everything You Need to Know",
    excerpt3: "How to Save Energy",
    image: Splash,
    link: "#",
  },
  {
    id: 4,
    title: "Investing",
    excerpt: "Investing in Index Funds for Beginners",
    excerpt1: "Is Now a Good Time to Invest in Stocks?",
    excerpt2: "Bonds vs Mutual Funds: Everything You Need to Know",
    image: Splash,
    link: "#",
  },
    {
    id: 5,
    title: "Financial Independence & Wealth Building",
    excerpt: "How to Build Wealth Without a Six-Figure Salary",
    excerpt1: "7 Simple Rules for a Wealthy Life",
    excerpt2: "How to Change Your Money Mindset (9 Simple Ways)",
    image: Splash,
    link: "#",
  },
  {
    id: 6,
    title: "Retirement Planning",
    excerpt: "How Much Money Do I Need to Retire?",
    excerpt1: "9 Simple Ways to Boost Your Retirement Pot",
    excerpt2: "How to Retire with 2 Million Pounds",
    excerpt3: "UK Pensions Explained: Everything You Need to Know",
    image: Splash,
    link: "#",
  },
];

export default function BlogSection() {
  return (
    <section className={styles.section}>

      <h2 className={styles.heading}>One place to learn to build wealth and master money</h2>
      <p className={styles.subheading}>Learn proven strategies to build lasting wealth and take control of your financial future. Expert guidance on investing, saving, and money management all in one place.</p>

      <div className={styles.posts}>
        {blogPosts.map((post) => (
          <a key={post.id} href={post.link} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={250}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <p className={styles.excerpt}>{post.excerpt1}</p>
              <p className={styles.excerpt}>{post.excerpt2}</p>
              <p className={styles.excerpt}>{post.excerpt3}</p>
            </div>
          </a>
        ))}
      </div>

      <div className={styles.moreLink}>
        <a href="#" className={styles.link}>+ Older Entries</a>
      </div>
    </section>
  );
}
