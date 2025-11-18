// sections/ValueProposition.tsx
'use client';
import ValueCard from '@/components/valueprep/ValueCard';
import styles from './valuePrep.module.scss';
import bgCardImg1 from '../../../public/waves.svg'

import bgCardImg4 from '../../../public/stripes.svg'

import { AiFillCloseCircle, AiOutlineTransaction } from 'react-icons/ai';
import { SiActualbudget } from 'react-icons/si';
import { LiaPersonBoothSolid } from 'react-icons/lia';
import { GiTakeMyMoney } from 'react-icons/gi';
import { GrWorkshop } from 'react-icons/gr';

export default function ValueProposition() {
  const values = [
    {
      icon: <AiOutlineTransaction />,
      title: 'Investing',
      description:
        'Guiding individuals in building a diversified and profitable investment portfolio.',
      footer: 'The Weathy Post',
      accentColor: '#3b82f6',
      bgImage: bgCardImg1,
      bgPosition: 'top' as const,
    },
    {
      icon: <AiFillCloseCircle />,
      title: 'Debt Management',
      description: 'Developing strategies to eliminate debt and improve financial stability.',
      footer: 'The Weathy Post',
      accentColor: '#22c55e',
      bgImage: bgCardImg4,
      bgPosition: 'top' as const,
    },
    {
      icon: <SiActualbudget />,
      title: 'Budgeting and Savings',
      description:
        'Creating personalized budgets and implementing effective savings plans.',
      footer: 'The Weathy Post',
      accentColor: '#ef4444',
      bgImage: bgCardImg1,
      bgPosition: 'top' as const,
    },
    {
      icon: <LiaPersonBoothSolid />,
      title: 'Personal Finance',
      description:
        'Empowering individuals and families to achieve financial independence.',
      footer: 'The Weathy Post',
      accentColor: '#3b82f6',
      bgImage: bgCardImg4,
      bgPosition: 'top' as const,
    },
    {
      icon: <GiTakeMyMoney />,
      title: 'Making Money',
      description: 'Identifying and implementing strategies to increase income and generate wealth.',
      footer: 'The Weathy Post',
      accentColor: '#22c55e',
      bgImage: bgCardImg1,
      bgPosition: 'top' as const,
    },
    {
      icon: <GrWorkshop />,
      title: 'Career Planning',
      description:
        'Navigating career choices, maximizing earning potential, and achieving professional fulfilment',
      footer: 'The Weathy Post',
      accentColor: '#ef4444',
      bgImage: bgCardImg4,
      bgPosition: 'top' as const,
    },
  ];

  return (
    <>
      <h1 className={styles.title}>What We Do Best</h1>
      <section className={styles.wrapper}>
        <div className={styles.grid}>
          {values.map((val, i) => (
            <ValueCard key={i} {...val} />
          ))}
        </div>
      </section>
    </>
  );
}
