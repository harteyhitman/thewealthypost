"use client";
import Image from "next/image";
import styles from "./BlogSection.module.scss";
import Budgeting from "../../../public/blogpost/budgeting-bascis.jpg";
import Debt from "../../../public/blogpost/debt-management.jpg";
import Savings from "../../../public/blogpost/savings-emegerncy.jpg";
import Investing from "../../../public/blogpost/investing.jpg";
import FinanceIndependence from "../../../public/blogpost/finanace-independence.jpg";
import RetirementPlan from "../../../public/blogpost/retirement-plans.jpg";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Budgeting Basics",
    excerpts: [
      "Investing in Index Funds for Beginners",
      "Is Now a Good Time to Invest in Stocks?",
      "Bonds vs Mutual Funds: Everything You Need to Know",
    ],
    image: Budgeting,
    link: "#",
  },
  {
    id: 2,
    title: "Debt Management",
    excerpts: [
      "How to Pay Off Debt Fast Even on a Low Income",
      "Debt Avalanche vs Debt Snowball: What is the Best Way to Pay Off Debt",
      "14 Common Mistakes to Avoid When Paying Off Debt",
    ],
    image: Debt,
    link: "#",
  },
  {
    id: 3,
    title: "Saving & Emergency Funds",
    excerpts: [
      "Emergency Fund: Everything You Need to Know",
      "Money-Saving Hacks: 15 Ways to Boost Your Savings",
      "Sinking Fund: Everything You Need to Know",
      "How to Save Energy",
    ],
    image: Savings,
    link: "#",
  },
  {
    id: 4,
    title: "Investing",
    excerpts: [
      "Investing in Index Funds for Beginners",
      "Is Now a Good Time to Invest in Stocks?",
      "Bonds vs Mutual Funds: Everything You Need to Know",
    ],
    image: Investing,
    link: "#",
  },
  {
    id: 5,
    title: "Financial Independence & Wealth Building",
    excerpts: [
      "How to Build Wealth Without a Six-Figure Salary",
      "7 Simple Rules for a Wealthy Life",
      "How to Change Your Money Mindset (9 Simple Ways)",
    ],
    image: FinanceIndependence,
    link: "#",
  },
  {
    id: 6,
    title: "Retirement Planning",
    excerpts: [
      "How Much Money Do I Need to Retire?",
      "9 Simple Ways to Boost Your Retirement Pot",
      "How to Retire with 2 Million Pounds",
      "UK Pensions Explained: Everything You Need to Know",
    ],
    image: RetirementPlan,
    link: "#",
  },
];

export default function BlogSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        One place to learn to build wealth and master money
      </h2>
      <p className={styles.subheading}>
        Learn proven strategies to build lasting wealth and take control of your
        financial future. Expert guidance on investing, saving, and money
        management all in one place.
      </p>

      <div className={styles.posts}>
        {blogPosts.map((post) => (
          <Link key={post.id} href={post.link} className={styles.card}>
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
              <ul className={styles.excerptList}>
                {post.excerpts.map((item, index) => (
                  <li key={index} className={styles.excerptItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.moreLink}>
        <Link href="/blog" className={styles.link}>
          + Older Entries
        </Link>
      </div>
    </section>
  );
}