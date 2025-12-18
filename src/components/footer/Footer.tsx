"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Footer.module.scss";
import ImgLogo from "../../../public/text-img-logo.png";
import { 
  FaMedium, 
  FaTwitter, 
  FaInstagram, 
  FaPinterest, 
  FaTiktok 
} from "react-icons/fa";
import { HiMail, HiLocationMarker } from "react-icons/hi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaMedium, href: "https://medium.com/@thewealthypost", label: "Medium" },
    { icon: FaTwitter, href: "https://twitter.com/thewealthypost", label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com/thewealthypost", label: "Instagram" },
    { icon: FaPinterest, href: "https://pinterest.com/thewealthypost", label: "Pinterest" },
    { icon: FaTiktok, href: "https://tiktok.com/@thewealthypost", label: "TikTok" },
  ];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/privacy-policy", label: "Privacy Policy" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Column - Logo & Social Media */}
          <motion.div
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/" className={styles.logoWrapper}>
              <Image
                src={ImgLogo}
                alt="The Wealthy Post Logo"
                width={200}
                height={80}
                className={styles.logo}
                priority
              />
            </Link>
            
            <div className={styles.socialMedia}>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialIcon}
                    aria-label={social.label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Middle Column - Navigation Links */}
          <motion.div
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.columnTitle}>Navigation</h3>
            <nav className={styles.nav}>
              <ul className={styles.navList}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.navLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.columnTitle}>Contact</h3>
            <div className={styles.contactInfo}>
              <a href="mailto:nd@thewealthypost.com" className={styles.contactItem}>
                <HiMail className={styles.contactIcon} />
                <span>nd@thewealthypost.com</span>
              </a>
              
              <div className={styles.contactItem}>
                <HiLocationMarker className={styles.contactIcon} />
                <span>
                  1st floor, North Westgate,<br />
                  Harlow, Essex, United Kingdom,<br />
                  CM20 1YS
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright Bar */}
        <motion.div
          className={styles.copyright}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className={styles.copyrightText}>
            © {currentYear} All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

