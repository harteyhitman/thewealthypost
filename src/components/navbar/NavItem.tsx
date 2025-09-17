import Link from "next/link";
import styles from "./NavItem.module.scss";

interface NavItemProps {
  href: string;
  label: string;
}

export default function NavItem({ href, label }: NavItemProps) {
  return (
    <Link href={href} className={styles.link}>
      {label}
    </Link>
  );
}
