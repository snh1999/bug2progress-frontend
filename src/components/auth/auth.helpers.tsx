import Link from "next/link";

export const getHeaderButtonLink = (pathUrl: string) =>
  pathUrl === "/register" ? getLoginLinkText() : getRegisterLinkText();

export const getLoginLinkText = () => <Link href="/login">Log In</Link>;
export const getRegisterLinkText = () => <Link href="register">Register</Link>;
