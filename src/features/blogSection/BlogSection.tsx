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

// Mapping function to convert excerpt titles to blog post slugs
// Links to existing posts or blog listing page for posts not yet created
const getSlugFromTitle = (title: string): string => {
  const titleToSlugMap: { [key: string]: string } = {
    // Investing posts - using existing investment guide
    "Investing in Index Funds for Beginners": "investment-beginners-complete-guide-2024",
    "Is Now a Good Time to Invest in Stocks?": "investment-beginners-complete-guide-2024",
    "Bonds vs Mutual Funds: Everything You Need to Know": "investment-beginners-complete-guide-2024",
    
    // Debt Management posts - using existing debt management guide
    "How to Pay Off Debt Fast Even on a Low Income": "debt-management-strategies-2024-uk",
    "Debt Avalanche vs Debt Snowball: What is the Best Way to Pay Off Debt": "debt-management-strategies-2024-uk",
    "14 Common Mistakes to Avoid When Paying Off Debt": "debt-management-strategies-2024-uk",
    
    // Saving & Emergency Funds posts - using existing emergency fund guide
    "Emergency Fund: Everything You Need to Know": "emergency-fund-why-how-much-2024",
    "Money-Saving Hacks: 15 Ways to Boost Your Savings": "savings-challenges-boost-emergency-fund-2024",
    "Sinking Fund: Everything You Need to Know": "savings-accounts-best-rates-2024",
    "How to Save Energy": "energy-bills-support-winter-2024",
    
    // Financial Independence & Wealth Building posts
    "How to Build Wealth Without a Six-Figure Salary": "investment-beginners-complete-guide-2024",
    "7 Simple Rules for a Wealthy Life": "financial-independence-retire-early-fire-2024",
    "How to Change Your Money Mindset (9 Simple Ways)": "financial-independence-retire-early-fire-2024",
    
    // Retirement Planning posts - using existing retirement guide
    "How Much Money Do I Need to Retire?": "retirement-planning-comprehensive-guide-2024",
    "9 Simple Ways to Boost Your Retirement Pot": "retirement-planning-comprehensive-guide-2024",
    "How to Retire with 2 Million Pounds": "retirement-planning-comprehensive-guide-2024",
    "UK Pensions Explained: Everything You Need to Know": "retirement-planning-comprehensive-guide-2024",
  };
  
  return titleToSlugMap[title] || "/blog";
};

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
    link: "/blog/investment-beginners-complete-guide-2024",
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
    link: "/blog/debt-management-strategies-2024-uk",
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
    link: "/blog/emergency-fund-why-how-much-2024",
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
    link: "/blog/investment-beginners-complete-guide-2024",
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
    link: "/blog/investment-beginners-complete-guide-2024",
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
    link: "/blog/retirement-planning-comprehensive-guide-2024",
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
          <div key={post.id} className={styles.card}>
            <Link href={post.link} className={styles.imageWrapper}>
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={250}
                className={styles.image}
              />
            </Link>
            <div className={styles.content}>
              <Link href={post.link} className={styles.title}>
                <h3>{post.title}</h3>
              </Link>
              <ul className={styles.excerptList}>
                {post.excerpts.map((item, index) => {
                  const slug = getSlugFromTitle(item);
                  return (
                    <li key={index} className={styles.excerptItem}>
                      <Link href={`/blog/${slug}`} className={styles.excerptLink}>
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
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