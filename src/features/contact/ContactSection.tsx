'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPaperAirplane } from 'react-icons/hi2';
import styles from './ContactSection.module.scss';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              className={styles.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              CONTACT US
            </motion.span>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Get In Touch.
            </motion.h2>
          </motion.div>

          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className={styles.inputRow}>
              <motion.div
                className={styles.inputGroup}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </motion.div>

              <motion.div
                className={styles.inputGroup}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-Mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </motion.div>
            </div>

            <motion.div
              className={styles.textareaGroup}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <textarea
                name="message"
                id="message"
                placeholder="Your Message Here"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className={styles.textarea}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting || submitted}
              className={styles.submitButton}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {isSubmitting ? (
                <span className={styles.buttonContent}>
                  <span className={styles.spinner}></span>
                  Sending...
                </span>
              ) : submitted ? (
                <span className={styles.buttonContent}>
                  <HiPaperAirplane />
                  Message Sent!
                </span>
              ) : (
                <span className={styles.buttonContent}>
                  Submit Now
                </span>
              )}
            </motion.button>

            {submitted && (
              <motion.div
                className={styles.successMessage}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Thank you! Your message has been sent successfully.
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
