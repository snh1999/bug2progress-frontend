import Link from "next/link";
import Image from "next/image";

export const LogoLink = () => (
  <Link href="/">
    <Image src="/logo.png" width={200} height={200} alt="logo" />
  </Link>
);
