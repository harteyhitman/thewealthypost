'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ImgLogo from '../../../public/text-img-logo.png';
import styles from './Preloader.module.scss';

export default function Preloader() {
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if preloader has already been shown in this session
    const hasShown = sessionStorage.getItem('preloaderShown');
    
    if (!hasShown) {
      setLoading(true);
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('preloaderShown', 'true');
        }, 500);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!loading) return null;

  return (
    <div className={`${styles.preloader} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Image
            src={ImgLogo}
            alt="The Wealthy Post Logo"
            priority
            width={200}
            height={80}
            className={styles.logo}
          />
        </div>
        
        {/* Wealth/Growth Animation: Rising Bars */}
        <div className={styles.growthAnimation}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        
        <div className={styles.brandName}>
          <span>T</span>
          <span>H</span>
          <span>E</span>
          <span>&nbsp;</span>
          <span>W</span>
          <span>E</span>
          <span>A</span>
          <span>L</span>
          <span>T</span>
          <span>H</span>
          <span>Y</span>
          <span>&nbsp;</span>
          <span>P</span>
          <span>O</span>
          <span>S</span>
          <span>T</span>
        </div>
      </div>
    </div>
  );
}
