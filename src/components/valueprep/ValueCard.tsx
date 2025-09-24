// components/ValueCard.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './ValueCard.module.scss';
import Image, { StaticImageData } from 'next/image';

type Props = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  footer?: string;
  accentColor?: string;
  bgImage?: string | StaticImageData;
  bgPosition?: 'right' | 'left' | 'bottom' | 'top'; // positioning
};

export default function ValueCard({
  icon,
  title,
  subtitle,
  description,
  accentColor = '#6E61FF',
  bgImage,
  bgPosition = 'right',
}: Props) {
  return (
    <div className={styles.card}>
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
    </div>
  );
}
