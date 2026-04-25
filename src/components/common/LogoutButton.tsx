import { useLogOut } from "@/api/auth/auth";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

export default function LogoutButton({ compact }: { compact?: boolean }) {
  const { mutate: logOut, isPending } = useLogOut();
  return (
    <Button
      variant="destructive"
      size={compact ? "icon" : "lg"}
      disabled={isPending}
      onClick={() => logOut()}
    >
      {compact ? <LogOutIcon /> : "Log Out"}
    </Button>
  );
}
