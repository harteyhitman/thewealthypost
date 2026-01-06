"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "../navbar/CTAButton";
import styles from "./Hero.module.scss";
import CEOIMg from "../../../public/CEOIMG.webp";
import cardimg from "../../../public/card-img.webp";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background Animation */}
      <motion.div
        className={styles.bgBlob1}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        className={styles.bgBlob2}
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />

      <div className={styles.container}>
        {/* Left Content */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.heading}>
            Empower Your <br /> Financial Future <br /> With{" "}
            <span>TheWealthyPost</span>
          </h1>
          <p className={styles.subheading}>
            Everything you need to build wealth and master your money, organized
            in one place for easy navigation.
          </p>

          <div className={styles.buttons}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <CTAButton href="/blog" label="Discover More" />
            </motion.div>
            <motion.a
              href="/about-us"
              className={styles.secondaryBtn}
              whileHover={{ scale: 1.05 }}
            >
              Why TheWealthyPost?
            </motion.a>
          </div>

          <div className={styles.stats}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3>65+</h3>
              <p>Businesses</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h3>250+</h3>
              <p>Daily transactions</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side Illustration + Person */}
        <motion.div
          className={styles.illustration}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className={styles.personWrapper}>
            <Image
              src={CEOIMg}
              alt="Hero person"
              width={400}
              height={400}
              className={styles.personImage}
            />
          </div>

          {/* Floating Cards */}
          <motion.div
            className={styles.card}
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Image src={cardimg} alt='cardimg' className={styles.cardImg}/>
            <h4>Nnamdi Udeze</h4>
            <p>The WealthyPost Founder</p>
           <ul>
            <li>
            <a href="">Read More</a>  
            </li>
           </ul>
          </motion.div>

          <motion.div
            className={styles.bubble}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
          >
            Transfer <span>9,560 INR</span>
          </motion.div>

          <motion.div
            className={styles.bubbleAlt}
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}
          >
            <span>Nnamdi Udeze</span>
            <span>The WealthyPost Founder</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
