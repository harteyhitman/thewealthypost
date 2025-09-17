"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Dropdown.module.scss";
import { RxDropdownMenu } from "react-icons/rx";

interface DropdownProps {
  label: string;
  items: { href: string; label: string }[];
  activeDropdown?: string | null;
  setActiveDropdown?: (label: string | null) => void;
}

export default function Dropdown({
  label,
  items,
  activeDropdown,
  setActiveDropdown,
}: DropdownProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false); // desktop hover state
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const open = isMobile
    ? activeDropdown === label
    : hoverOpen; // use parent state for mobile

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
      setHoverOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      closeTimeout.current = setTimeout(() => setHoverOpen(false), 200);
    }
  };

  const toggleMobile = () => {
    if (isMobile && setActiveDropdown) {
      setActiveDropdown(open ? null : label); // close others
    }
  };

  return (
    <div
      className={`${styles.dropdown} ${isMobile ? styles.mobile : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={styles.trigger}
        onClick={isMobile ? toggleMobile : undefined}
      >
        {label}
        <RxDropdownMenu
          className={`${styles.icon} ${open ? styles.open : ""}`}
          size={16}
        />
      </button>

      <div
        className={`${styles.menuWrapper} ${open ? styles.open : ""} ${
          isMobile ? styles.mobileMenuWrapper : ""
        }`}
      >
        <div className={`${styles.menu} ${isMobile ? styles.mobileMenu : ""}`}>
          {items.map((item, i) => (
            <Link key={i} href={item.href} className={styles.menuItem}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
