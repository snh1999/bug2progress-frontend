import Link from "next/link";
import Image from "next/image";

export const LogoLink = () => (
  <div className="dark:bg-neutral-600 bg-neutral-50 rounded-md">
  <Link href="/" >
    <Image src="/logo.png" width={200} height={200} alt="logo" />
  </Link>
  </div>
);
