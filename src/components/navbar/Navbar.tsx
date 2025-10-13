"use client";

import { useState } from "react";
import Logo from "./ImgLogo";
import NavItem from "./NavItem";
import Dropdown from "./Dropdown";
import CTAButton from "./CTAButton";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // mobile menu toggle
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // mobile accordion state

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Logo />

        {/* Desktop Menu */}
        <div className={styles.menu}>
          <NavItem href="/" label="Home" />
          <Dropdown
            label="Products"
            items={[
              { href: "/pricing", label: "Pricing" },
              { href: "/about", label: "About Us" },
            ]}
          />
          <Dropdown
            label="FAQs"
            items={[
              { href: "/questions", label: "Questions" },
              { href: "/answers", label: "Answers" },
            ]}
          />
          <Dropdown
            label="Guides"
            items={[
              { href: "/guidelines", label: "Guidelines" },
              { href: "/terms", label: "Terms" },
              { href: "/conditions", label: "Conditions" },
            ]}
          />
          <Dropdown
            label="About"
            items={[
              { href: "/team", label: "Our Team" },
              { href: "/contact", label: "Contact" },
            ]}
          />
          <Dropdown
            label="Resources"
            items={[
              { href: "/podcast", label: "Podcast" },
              { href: "/blogs", label: "Blogs" },
            ]}
          />
          <CTAButton href="/discover-more" label="Discover More" />
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.mobileToggle}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
        <NavItem href="/" label="Home" />
        <Dropdown
          label="Products"
          items={[
            { href: "/pricing", label: "Pricing" },
            { href: "/about", label: "About Us" },
          ]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        <Dropdown
          label="Blogs"
          items={[
            { href: "/blog1", label: "Blog 1" },
            { href: "/blog2", label: "Blog 2" },
          ]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        <Dropdown
          label="Podcast"
          items={[
            { href: "/podcast1", label: "Podcast 1" },
            { href: "/podcast2", label: "Podcast 2" },
          ]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        <Dropdown
          label="About"
          items={[
            { href: "/team", label: "Our Team" },
            { href: "/contact", label: "Contact" },
          ]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        <Dropdown
          label="Resources"
          items={[
            { href: "/guides", label: "Guides" },
            { href: "/faq", label: "FAQ" },
          ]}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        <CTAButton href="/discover-more" label="Discover More" />
      </div>
    </nav>
  );
}
