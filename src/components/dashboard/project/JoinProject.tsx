import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PROJECTS_PATH } from "@/app.constants";
import { useJoinProjectByInviteCode } from "@/api/projects/projectContributors";

const JoinProject = () => {
  const [inviteCode, setInviteCode] = useState("");
  const router = useRouter();

  const { mutate, isPending } = useJoinProjectByInviteCode();

  const handleClick = () => {
    mutate(inviteCode, {
      onSuccess: ({ projectId }) => {
        setInviteCode("");
        toast.success("You joined the project");
        router.push(`${PROJECTS_PATH}/${projectId}`);
      },
    });
  };

  return (
    <div className="flex flex-col gap-5 p-10 pb-5 items-center">
      <Label className="font-bold text-2xl">Join with Invite Code</Label>
      <Input
        type="text"
        placeholder="Enter your invite code"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
        required
      />

      <Button
        size="lg"
        className="ml-auto"
        disabled={isPending || !inviteCode}
        onClick={handleClick}
      >
        Join
      </Button>
    </div>
  );
};

export default JoinProject;
