import Link from "next/link";
import styles from "./CTAButton.module.scss";

interface CTAButtonProps {
  href: string;
  label: string;
}

export default function CTAButton({ href, label }: CTAButtonProps) {
  return (
    <Link href={href} className={styles.button}>
      {label}
    </Link>
  );
}
