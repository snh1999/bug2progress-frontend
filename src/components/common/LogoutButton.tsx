import { useLogOut } from "@/api/auth/auth";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const { mutate: logOut, isPending } = useLogOut();
  return (
    <Button
      variant="destructive"
      size="lg"
      disabled={isPending}
      onClick={() => logOut()}
    >
      Log Out
    </Button>
  );
}
