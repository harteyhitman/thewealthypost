'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiCheckCircle, 
  HiMail, 
  HiUser, 
  HiCalendar,
  HiCurrencyPound,
  HiClipboardCheck,
  HiArrowRight,
  HiArrowLeft
} from 'react-icons/hi';
import styles from './PensionChecklistForm.module.scss';

interface FormData {
  name: string;
  email: string;
  age: string;
  currentPensionValue: string;
  monthlyContribution: string;
  retirementAge: string;
  expectedRetirementIncome: string;
}

export default function PensionChecklistForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    currentPensionValue: '',
    monthlyContribution: '',
    retirementAge: '',
    expectedRetirementIncome: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const checklistItems = [
    'Review your current pension statements',
    'Calculate your projected retirement income',
    'Check your State Pension entitlement',
    'Review your workplace pension contributions',
    'Consider additional private pension options',
    'Review your pension investment strategy',
    'Check your pension provider fees',
    'Understand your pension withdrawal options',
    'Plan for tax implications in retirement',
    'Review your pension beneficiaries',
    'Consider pension consolidation options',
    'Get professional pension advice',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.successCard}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={styles.successIcon}
            >
              <HiCheckCircle />
            </motion.div>
            <h1 className={styles.successTitle}>Thank You</h1>
            <h2 className={styles.successSubtitle}>Check Your Email</h2>
            <p className={styles.successMessage}>
              We've sent your Ultimate Pension Checklist to <strong>{formData.email}</strong>. 
              Please check your inbox (and spam folder) to access your personalized checklist.
            </p>
            <div className={styles.successActions}>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    age: '',
                    currentPensionValue: '',
                    monthlyContribution: '',
                    retirementAge: '',
                    expectedRetirementIncome: '',
                  });
                }}
                className={styles.backButton}
              >
                <HiArrowLeft /> Request Another Checklist
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.hero}
        >
          <div className={styles.heroIcon}>
            <HiClipboardCheck />
          </div>
          <h1 className={styles.heroTitle}>The Ultimate Pension Checklist</h1>
          <p className={styles.heroDescription}>
            Get your comprehensive pension planning checklist delivered to your inbox. 
            Take control of your retirement planning with our step-by-step guide.
          </p>
        </motion.div>

        <div className={styles.content}>
          {/* Checklist Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.checklistPreview}
          >
            <h2 className={styles.checklistTitle}>What's Included:</h2>
            <ul className={styles.checklistItems}>
              {checklistItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className={styles.checklistItem}
                >
                  <HiCheckCircle className={styles.checkIcon} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.formCard}
          >
            <h2 className={styles.formTitle}>Get Your Free Checklist</h2>
            <p className={styles.formDescription}>
              Fill in your details below and we'll send your personalized pension checklist straight to your email.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">
                  <HiUser className={styles.inputIcon} />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`${styles.inputField} ${errors.name ? styles.inputError : ''}`}
                />
                {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">
                  <HiMail className={styles.inputIcon} />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`${styles.inputField} ${errors.email ? styles.inputError : ''}`}
                />
                {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="age">
                    <HiCalendar className={styles.inputIcon} />
                    Your Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 35"
                    min="18"
                    max="100"
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="retirementAge">
                    <HiCalendar className={styles.inputIcon} />
                    Target Retirement Age
                  </label>
                  <input
                    type="number"
                    id="retirementAge"
                    name="retirementAge"
                    value={formData.retirementAge}
                    onChange={handleChange}
                    placeholder="e.g. 65"
                    min="55"
                    max="75"
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="currentPensionValue">
                    <HiCurrencyPound className={styles.inputIcon} />
                    Current Pension Value (£)
                  </label>
                  <input
                    type="number"
                    id="currentPensionValue"
                    name="currentPensionValue"
                    value={formData.currentPensionValue}
                    onChange={handleChange}
                    placeholder="e.g. 50000"
                    min="0"
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="monthlyContribution">
                    <HiCurrencyPound className={styles.inputIcon} />
                    Monthly Contribution (£)
                  </label>
                  <input
                    type="number"
                    id="monthlyContribution"
                    name="monthlyContribution"
                    value={formData.monthlyContribution}
                    onChange={handleChange}
                    placeholder="e.g. 500"
                    min="0"
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="expectedRetirementIncome">
                  <HiCurrencyPound className={styles.inputIcon} />
                  Expected Retirement Income (£/year)
                </label>
                <input
                  type="number"
                  id="expectedRetirementIncome"
                  name="expectedRetirementIncome"
                  value={formData.expectedRetirementIncome}
                  onChange={handleChange}
                  placeholder="e.g. 30000"
                  min="0"
                  className={styles.inputField}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send It <HiArrowRight />
                  </>
                )}
              </button>

              <p className={styles.privacyNote}>
                By submitting this form, you agree to receive the pension checklist via email. 
                We respect your privacy and will never share your information.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

