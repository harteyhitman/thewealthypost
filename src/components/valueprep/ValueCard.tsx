// components/ValueCard.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./ValueCard.module.scss";

type Props = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  footer?: string;
  accentColor?: string;
  bgImage?: any; // background accent
  bgPosition?: "right" | "left" | "bottom"; // positioning
};

export default function ValueCard({
  icon,
  title,
  subtitle,
  description,
  footer,
  accentColor = "#6E61FF",
  bgImage,
  bgPosition = "right",
}: Props) {
  return (
    <div className={styles.card}>
      {/* Background accent (animated) */}
      {bgImage && (
        <motion.img
          src={bgImage}
          alt=""
          className={`${styles.bgImage} ${styles[bgPosition]}`}
          initial={{ scale: 1, rotate: 0 }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: `drop-shadow(0 0 10px ${accentColor})` }}
        />
      )}

      {/* Header */}
      <div className={styles.header}>
        <span className={styles.icon} style={{ backgroundColor: accentColor }}>
          {icon}
        </span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </div>

      {/* Title & Description */}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      {/* Footer */}
      {footer && <p className={styles.footer}>{footer}</p>}
    </div>
  );
}
