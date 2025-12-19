"use client";

import { motion } from "framer-motion";
import styles from "./AboutPage.module.scss";
import { HiPaperAirplane, HiOutlineLightBulb, HiOutlineChartBar, HiOutlineCurrencyDollar, HiOutlineBriefcase, HiOutlineBanknotes, HiOutlineWallet, HiOutlineUserGroup } from "react-icons/hi2";
import { FiArrowRight, FiMail } from "react-icons/fi";
import Link from "next/link";

export default function AboutPage() {
  const expertiseAreas = [
    {
      icon: <HiOutlineChartBar />,
      title: "Investing",
      description: "Guiding individuals in building a diversified and profitable investment portfolio"
    },
    {
      icon: <HiOutlineBanknotes />,
      title: "Debt Management",
      description: "Developing strategies to eliminate debt and improve financial stability"
    },
    {
      icon: <HiOutlineLightBulb />,
      title: "Budgeting and Savings",
      description: "Creating personalized budgets and implementing effective savings plans"
    },
    {
      icon: <HiOutlineWallet />,
      title: "Personal Finance",
      description: "Empowering individuals and families to achieve financial independence"
    },
    {
      icon: <HiOutlineCurrencyDollar />,
      title: "Making Money",
      description: "Identifying and implementing strategies to increase income and generate wealth"
    },
    {
      icon: <HiOutlineUserGroup />,
      title: "Career Planning",
      description: "Navigating career choices, maximizing earning potential, and achieving professional fulfilment"
    }
  ];

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroBlob1} />
          <div className={styles.heroBlob2} />
        </div>
        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className={styles.heroTitle}>About</h1>
            <div className={styles.heroSubtitle}>
              <h2 className={styles.heroName}>Nnamdi Udeze</h2>
              <p className={styles.heroRole}>CEO & Founder</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section className={styles.aboutMe}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.sectionBadge}>About Me</span>
            <h2 className={styles.sectionTitle}>
              <strong>Hello friend!</strong> I'm <strong>Nnamdi</strong>, but feel free to call me <strong>ND.</strong>
            </h2>
          </motion.div>

          <div className={styles.contentGrid}>
            <motion.div
              className={styles.textContent}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className={styles.introText}>
                I live in Cornwall, UK. I am many things - a Christian, a loving husband, a caring dad, and your new friend who will help you understand money better.
              </p>

              <div className={styles.storySection}>
                <h3 className={styles.storyTitle}>Beginning a Journey of Financial Enlightenment</h3>
                <p className={styles.storyText}>
                  My personal finance growth started when I decided to learn more about money to take better care of my family as we relocated to the UK. I started writing down everything I learned, and I eventually turned my notes into a blog.
                </p>
              </div>

              <div className={styles.storySection}>
                <h3 className={styles.storyTitle}>A Fusion of Finance, Project Management and Tech</h3>
                <p className={styles.storyText}>
                  I have 5 years of experience in the financial services industry, working in a variety of roles. This experience has given me a deep understanding of the financial world and how it works. A few years ago I transitioned into IT project management.
                </p>
              </div>

              <div className={styles.storySection}>
                <h3 className={styles.storyTitle}>Beginning a Journey of Financial Enlightenment</h3>
                <p className={styles.storyText}>
                  My goal is financial freedom and I firmly believe that everyone deserves to have financial freedom so they can live their best life.
                </p>
                <p className={styles.storyText}>
                  When you are financially independent, you have the freedom to choose how you want to spend your time, money, and energy. You can focus on the things that are most important to you, such as your family, your health, and your passions.
                </p>
                <p className={styles.storyText}>
                  Let's go on this important journey together, learning and growing as we go. You or I don't have to do it alone.
                </p>
              </div>

              <div className={styles.contactSection}>
                <p className={styles.contactText}>
                  If you have any questions, tips, recommendations, guest post ideas, or requests, please email me at{" "}
                  <a href="mailto:nd@thewealthypost.com" className={styles.emailLink}>
                    <strong>nd@thewealthypost.com</strong>
                  </a>
                  . It is appreciated.
                </p>
                <Link href="/blog" className={styles.discoverBtn}>
                  Discover More <FiArrowRight />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className={styles.imageCard}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className={styles.cardWrapper}>
                <div className={styles.cardContent}>
                  <div className={styles.cardIcon}>
                    <FiMail />
                  </div>
                  <h3 className={styles.cardTitle}>Get In Touch</h3>
                  <p className={styles.cardSubtitle}>Have questions or want to collaborate?</p>
                  <a 
                    href="mailto:nd@thewealthypost.com" 
                    className={styles.cardEmailLink}
                  >
                    <span>nd@thewealthypost.com</span>
                    <HiPaperAirplane />
                  </a>
                </div>
                <div className={styles.cardDecoration} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className={styles.philosophy}>
        <div className={styles.container}>
          <motion.div
            className={styles.philosophyContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={styles.philosophyTitle}>My Philosophy</h2>
            <div className={styles.philosophyText}>
              <p>
                I believe that financial freedom is not just about having money. It's also about having the knowledge and skills to manage your money wisely. It's about understanding the connection between your finances and your overall well-being. And it's about investing in your passions and goals so that you can live your best life.
              </p>
              <p>
                I'm still on my own journey to financial freedom, but I've learned a lot along the way. I'm excited to share my knowledge and experience with you and help you achieve your financial goals.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Areas of Expertise */}
      <section className={styles.expertise}>
        <div className={styles.container}>
          <motion.div
            className={styles.expertiseHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.expertiseTitle}>Core Area of Expertise</h2>
            <p className={styles.expertiseSubtitle}>
              Be intentional with your finances, transform your money mindset, and equip yourself with the knowledge to achieve financial independence
            </p>
          </motion.div>

          <div className={styles.expertiseGrid}>
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={index}
                className={styles.expertiseCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={styles.expertiseIcon}>{area.icon}</div>
                <h3 className={styles.expertiseCardTitle}>{area.title}</h3>
                <p className={styles.expertiseCardDescription}>{area.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.expertiseFooter}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/blog" className={styles.readMoreLink}>
              Read more <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

