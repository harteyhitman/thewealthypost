import Image from "next/image";
import ImgLogo from "../../../public/text-img-logo.png";
import styles from "./ImgLogo.module.scss";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      <Image src={ImgLogo}  alt="The Wealthy Post Logo"
        priority
        sizes="(max-width: 768px) 140px, 180px"
        className=" bg-[#ffffff] rounded color-[#000000]"
      />
    </Link>
  );
}
