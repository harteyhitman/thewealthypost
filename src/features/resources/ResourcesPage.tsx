'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiCalculator, 
  HiBookOpen, 
  HiUserGroup, 
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
  HiExternalLink,
  HiClipboardCheck
} from 'react-icons/hi';
import { FaFacebook } from 'react-icons/fa';
import styles from './ResourcesPage.module.scss';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
}

export default function ResourcesPage() {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  const tools: Tool[] = [
    {
      id: 'early-retirement',
      title: 'Early Retirement Calculator',
      description: 'When can I retire? A calculator that shows when you can retire based on your current expenses and savings rate',
      icon: <HiCalculator />,
      link: '#',
    },
    {
      id: 'retirement-savings',
      title: 'Retirement Savings Calculator',
      description: 'How much do I need to retire? A calculator that helps you determine how much you need to save for retirement based on your desired lifestyle and retirement age.',
      icon: <HiCalculator />,
      link: '#',
    },
    {
      id: 'financial-wellness',
      title: 'Financial Wellness Assessment',
      description: 'Create a quiz or assessment that evaluates your financial wellness and provides personalized recommendations for your improvement',
      icon: <HiCalculator />,
      link: '#',
    },
    {
      id: 'mortgage-affordability',
      title: 'Mortgage Affordability Calculator',
      description: 'How Much Can You Afford? Input various parameters to understand how much a mortgage costs',
      icon: <HiCalculator />,
      link: '#',
    },
    {
      id: 'debt-payoff',
      title: 'Debt Payoff Calculator',
      description: 'How long it will take to pay off your debt and how much interest would you save',
      icon: <HiCalculator />,
      link: '#',
    },
    {
      id: 'savings-goal',
      title: 'Savings Goal Calculator',
      description: 'Find out how much to save each month or how long to commit to saving to achieve your financial goal',
      icon: <HiCalculator />,
      link: '#',
    },
    {
      id: 'mortgage-repayment',
      title: 'Mortgage Repayment Calculator',
      description: 'If you are considering taking out a mortgage loan, or are looking for mortgage refinancing, this finance calculator should prove useful',
      icon: <HiCalculator />,
      link: '#',
    },
    {
      id: 'compound-interest',
      title: 'Compound Interest Calculator',
      description: 'Work out the compound interest on your savings or investments',
      icon: <HiCalculator />,
      link: '#',
    },
  ];

  const books: Book[] = [
    {
      id: 'rich-dad',
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      cover: '/book-covers/rich-dad-poor-dad.jpg',
    },
    {
      id: 'richest-man',
      title: 'The Richest Man in Babylon',
      author: 'George S. Clason',
      cover: '/book-covers/richest-man-babylon.jpg',
    },
    {
      id: 'think-grow',
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      cover: '/book-covers/think-grow-rich.jpg',
    },
    {
      id: 'psychology-money',
      title: 'Psychology of Money',
      author: 'Morgan Housel',
      cover: '/book-covers/psychology-money.jpg',
    },
    {
      id: 'shoe-dog',
      title: 'Shoe Dog',
      author: 'Phil Knight',
      cover: '/book-covers/shoe-dog.jpg',
    },
  ];

  const nextBook = () => {
    setCurrentBookIndex((prev) => (prev + 1) % books.length);
  };

  const prevBook = () => {
    setCurrentBookIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  return (
    <div className={styles.resourcesPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.heroTitle}>Resources</h1>
            <p className={styles.heroDescription}>
              Here is the best place to find the best resources that I have created to help you move forward with your personal finances. Check them out below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section className={styles.toolsSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.sectionHeader}
          >
            <div className={styles.iconWrapper}>
              <HiCalculator className={styles.sectionIcon} />
            </div>
            <h2 className={styles.sectionTitle}>Tools</h2>
            <p className={styles.sectionDescription}>
              These are financial calculators that can help you achieve your various financial success, for both short and long term goals
            </p>
            <motion.a
              href="/pension-checklist-form"
              className={styles.pensionChecklistBanner}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <HiClipboardCheck />
              <div>
                <strong>The Ultimate Pension Checklist</strong>
                <span>Get your free comprehensive pension planning guide</span>
              </div>
              <HiArrowRight />
            </motion.a>
          </motion.div>

          <div className={styles.toolsGrid}>
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={styles.toolCard}
              >
                <div className={styles.toolIcon}>{tool.icon}</div>
                <h3 className={styles.toolTitle}>{tool.title}</h3>
                <p className={styles.toolDescription}>{tool.description}</p>
                <a href={tool.link} className={styles.toolLink}>
                  Click Here <HiArrowRight />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Wealthy Hub Section */}
      <section className={styles.hubSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.hubCard}
          >
            <div className={styles.hubContent}>
              <div className={styles.hubIconWrapper}>
                <HiUserGroup className={styles.hubIcon} />
              </div>
              <h2 className={styles.hubTitle}>The Wealthy Hub</h2>
              <p className={styles.hubDescription}>
                The Wealthy Hub is a closed Facebook group where thousands of like-minded people ask and answer questions and learn more about how to manage their money.
              </p>
              <a
                href="https://facebook.com/groups/thewealthyhub"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.hubButton}
              >
                <FaFacebook /> Join Community
                <HiExternalLink />
              </a>
            </div>
            <div className={styles.hubVisual}>
              <div className={styles.hubPattern}></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weekly Recommended Books Section */}
      <section className={styles.booksSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.sectionHeader}
          >
            <div className={styles.iconWrapper}>
              <HiBookOpen className={styles.sectionIcon} />
            </div>
            <h2 className={styles.sectionTitle}>Weekly Recommended Books</h2>
            <p className={styles.sectionDescription}>
              Discover the books that have shaped financial minds and transformed wealth-building strategies
            </p>
          </motion.div>

          <div className={styles.booksCarousel}>
            <button
              className={styles.carouselButton}
              onClick={prevBook}
              aria-label="Previous book"
            >
              <HiChevronLeft />
            </button>

            <div className={styles.carouselContainer}>
              {books.map((book, index) => {
                const position = index - currentBookIndex;
                const isActive = position === 0;
                const isPrev = position === -1 || (position === books.length - 1);
                const isNext = position === 1 || (position === -(books.length - 1));

                return (
                  <motion.div
                    key={book.id}
                    className={`${styles.bookCard} ${
                      isActive ? styles.active : ''
                    } ${isPrev ? styles.prev : ''} ${isNext ? styles.next : ''}`}
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.6,
                      x: position * 120,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={styles.bookCover}>
                      <div className={styles.bookPlaceholder}>
                        <HiBookOpen />
                      </div>
                    </div>
                    <div className={styles.bookInfo}>
                      <h3 className={styles.bookTitle}>{book.title}</h3>
                      <p className={styles.bookAuthor}>{book.author}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              className={styles.carouselButton}
              onClick={nextBook}
              aria-label="Next book"
            >
              <HiChevronRight />
            </button>
          </div>

          <div className={styles.bookIndicators}>
            {books.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${
                  index === currentBookIndex ? styles.active : ''
                }`}
                onClick={() => setCurrentBookIndex(index)}
                aria-label={`Go to book ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

