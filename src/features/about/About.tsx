"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./About.module.scss";
import { HiPaperAirplane } from "react-icons/hi2";
import { FiArrowRight } from "react-icons/fi";

export default function About() {
  return (
    <section className={styles.about}>
      {/* Decorative Background Elements */}
      <div className={styles.backgroundElements}>
        <motion.div
          className={styles.decorativeBlob1}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={styles.decorativeBlob2}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Left Column - Content */}
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className={styles.badge}>
              <span>Our Story</span>
            </div>
            
            <h2 className={styles.heading}>
              About <span className={styles.headingAccent}>TheWealthyPost</span>
            </h2>
            
            <div className={styles.descriptionWrapper}>
              <p className={styles.description}>
                Hi, I'm <strong>Nnamdi</strong>, and I created The Wealthy Post to make personal finance simple for everyone. 
                After relocating to the UK and discovering that many people struggled to understand the financial system, 
                I turned my experience into a resource to help others improve their financial lives.
              </p>
              
              <p className={styles.description}>
                This page is designed to guide you through the first steps if you're a newbie. Explore our curated content 
                and tools to start making confident financial decisions today! We're always updating, so check back often.
              </p>
            </div>

            <div className={styles.actions}>
              <Link href="/about" className={styles.readMoreBtn}>
                <span>READ MORE</span>
                <FiArrowRight className={styles.arrowIcon} />
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Contact Card */}
          <motion.div
            className={styles.contactCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className={styles.cardContent}>
              <div className={styles.cardIconWrapper}>
                <div className={styles.cardIcon}>
                  <HiPaperAirplane />
                </div>
                <div className={styles.iconGlow} />
              </div>
              
              <h3 className={styles.cardTitle}>Get In Touch</h3>
              <p className={styles.cardSubtitle}>Send us an email</p>
              
              <a 
                href="mailto:nd@thewealthypost.com" 
                className={styles.emailLink}
              >
                <span className={styles.emailAddress}>nd@thewealthypost.com</span>
                <HiPaperAirplane className={styles.emailIcon} />
              </a>
            </div>
            
            <div className={styles.cardDecoration} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

