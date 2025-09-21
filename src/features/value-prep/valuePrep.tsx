// sections/ValueProposition.tsx
'use client';
import { FaApple, FaGooglePlay, FaMusic } from 'react-icons/fa';
import ValueCard from '@/components/valueprep/ValueCard';
import styles from './valuePrep.module.scss';
import bgCardImg1 from '../../../public/waves.svg'
import bgCardImg2 from '../../../public/dots.svg'
import bgCardImg3 from '../../../public/rings.svg'
import bgCardImg4 from '../../../public/stripes.svg'
import bgCardImg5 from '../../../public/dots2.svg'
import bgCardImg6 from '../../../public/dots2.svg'

export default function ValueProposition() {
  const values = [
    {
      icon: <FaApple />,
      title: 'Seamless Experience',
      description:
        'Our platform is optimized for speed and design consistency.',
      footer: 'Trusted Worldwide',
      accentColor: '#3b82f6',
      bgImage: {bgCardImg1},
      bgPosition: 'bottom' as const,
    },
    {
      icon: <FaGooglePlay />,
      title: 'Cross-Platform',
      description: 'Available across all devices for maximum accessibility.',
      footer: '20+ Integrations',
      accentColor: '#22c55e',
      bgImage: {bgCardImg2},
      bgPosition: 'bottom' as const,
    },
    {
      icon: <FaMusic />,
      title: 'Engaging Design',
      description:
        'Interactive and aesthetic UI tailored for better user experience.',
      footer: 'Award Winning',
      accentColor: '#ef4444',
      bgImage: {bgCardImg3},
      bgPosition: 'bottom' as const,
    },
    {
      icon: <FaApple />,
      title: 'Seamless Experience',
      description:
        'Our platform is optimized for speed and design consistency.',
      footer: 'Trusted Worldwide',
      accentColor: '#3b82f6',
      bgImage: {bgCardImg4},
      bgPosition: 'bottom' as const,
    },
    {
      icon: <FaGooglePlay />,
      title: 'Cross-Platform',
      description: 'Available across all devices for maximum accessibility.',
      footer: '20+ Integrations',
      accentColor: '#22c55e',
      bgImage: {bgCardImg5},
      bgPosition: 'bottom' as const,
    },
    {
      icon: <FaMusic />,
      title: 'Engaging Design',
      description:
        'Interactive and aesthetic UI tailored for better user experience.',
      footer: 'Award Winning',
      accentColor: '#ef4444',
      bgImage: {bgCardImg6},
      bgPosition: 'bottom' as const,
    },
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.grid}>
        {values.map((val, i) => (
          <ValueCard key={i} {...val} />
        ))}
      </div>
    </section>
  );
}
