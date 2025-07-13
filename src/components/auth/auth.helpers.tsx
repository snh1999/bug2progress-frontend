import Link from "next/link";
import { LOGIN_PATH, REGISTER_PATH } from "@/app.constants";
import { Button } from "@/components/ui/button";

export const getHeaderButtonLink = (pathUrl: string) =>
  <Button variant="primary" asChild>{pathUrl === REGISTER_PATH ? getLoginLinkText() : getRegisterLinkText()}</Button>;

export const getLoginLinkText = () => <Link href={LOGIN_PATH}>Log In</Link> ;
export const getRegisterLinkText = () => <Link href={REGISTER_PATH}>Register</Link>;
