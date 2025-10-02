'use client';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from './testimonials.module.scss';
import { ImQuotesLeft } from 'react-icons/im';

const testimonialsData = [
  {
    id: 1,
    text: 'Exceeded our expectations with innovative designs that brought our vision to life - a truly remarkable creative agency.',
    author: 'Samantha Johnson',
    position: 'CEO and Co-founder',
    company: 'ABC Company',
 image: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    text: 'Their ability to capture our brand essence in every project is unparalleled - an invaluable creative collaborator.',
    author: 'Isabella Rodriguez',
    position: 'CEO and Co-founder',
    company: 'ABC Company',
    image: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    text: 'Creative geniuses who listen, understand, and craft captivating visuals - an agency that truly understands our needs.',
    author: 'Gabrielle Williams',
    position: 'CEO and Co-founder',
    company: 'ABC Company',
    image: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 4,
    text: 'A refreshing and imaginative agency that consistently delivers exceptional results - highly recommended for any project.',
    author: 'Victoria Thompson',
    position: 'CEO and Co-founder',
    company: 'ABC Company',
    image: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: 5,
    text: "Their team's artistic flair and strategic approach resulted in remarkable campaigns - a reliable creative partner.",
    author: 'John Peter',
    position: 'CEO and Co-founder',
    company: 'ABC Company',
    image: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 6,
    text: "From concept to execution, their creativity knows no bounds - a game-changer for our brand's success.",
    author: 'Natalie Martinez',
    position: 'CEO and Co-founder',
    company: 'ABC Company',
    image: "https://i.pravatar.cc/150?img=6"
  },
  {
    id: 7,
    text: 'Exceptional service and outstanding creativity that transformed our brand identity completely.',
    author: 'Michael Chen',
    position: 'CEO and Co-founder',
    company: 'ABC Company',
    image: "https://i.pravatar.cc/150?img=7"
  },
  {
    id: 8,
    text: 'Professional, innovative, and consistently delivering beyond expectations - the perfect creative partner.',
    author: 'Sarah Wilson',
    position: 'CEO and Co-founder',
    company: 'ABC Company',
    image: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: 9,
    text: 'Their strategic insights combined with creative excellence delivered outstanding results for our campaign.',
    author: 'David Kim',
    position: 'CEO and Co-founder',
    company: 'ABC Company',
    image: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: 10,
    text: 'A partner that truly understands the balance between aesthetics and functionality in design.',
    author: 'Lisa Anderson',
    position: 'CEO and Co-founder',
    company: 'ABC Company',
    image: "https://i.pravatar.cc/150?img=10"
  },
  {
    id: 11,
    text: 'Innovative solutions that pushed our brand forward in the competitive market space.',
    author: 'Robert Garcia',
    position: 'CEO and Co-founder',
    company: 'ABC Company',
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 12,
    text: 'Consistently delivering creative excellence that exceeds all our expectations and deadlines.',
    author: 'Jennifer Lopez',
    position: 'CEO and Co-founder',
    company: 'ABC Company',
    image: "https://i.pravatar.cc/150?img=12",
  },
];

function TestimonialRow({ items }: { items: typeof testimonialsData }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0].clientWidth + 24;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    scrollToIndex(newIndex);
  };

  return (
    <div className={styles.rowWrapper}>
      <div className={styles.carousel} ref={carouselRef}>
        {items.map((t) => (
          <motion.div
            key={t.id}
            className={styles.card}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 250 }}>
            <span className={styles.quote}>
              <ImQuotesLeft />
            </span>
            <p className={styles.text}>{t.text}</p>
            <div className={styles.profile}>
              <img src={t.image} alt={t.author} className={styles.avatar} />
              <div>
                <h3 className={styles.author}>{t.author}</h3>
                <p className={styles.position}>{t.position}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className={`${styles.navBtn} ${styles.leftBtn}`}>
        ‹
      </button>
      <button
        onClick={handleNext}
        className={`${styles.navBtn} ${styles.rightBtn}`}>
        ›
      </button>
    </div>
  );
}

export default function Testimonials() {
  const firstRow = testimonialsData.slice(0, 6);
  const secondRow = testimonialsData.slice(6, 12);

  return (
    <section id='testimonials' className={styles.section}>
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}>
        What Our Clients says About TheWealthyPost
      </motion.h2>

      <div className={styles.rows}>
        <TestimonialRow items={firstRow} />
        <TestimonialRow items={secondRow} />
      </div>
    </section>
  );
}
