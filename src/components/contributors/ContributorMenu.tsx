import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import {
  EContributorAction,
  useCheckPermission,
} from "@/components/contributors/contributor.helper";
import { useProjectId } from "@/hooks/useProjectId";
import { ExternalIcon } from "next/dist/client/components/react-dev-overlay/ui/icons/external";
import {
  useDeleteContributor,
  useUpdateProjectContributorRole,
} from "@/api/projects/projectContributors";
import { useConfirm } from "@/hooks/useConfirm";
import { EProjectRole } from "@/api/projects/projects.types";

type TContributorMenu = {
  userId: string;
};

export function ContributorMenu({ userId }: TContributorMenu) {
  const projectId = useProjectId();

  const editRolePermission = useCheckPermission(
    EContributorAction.EDIT_ROLE,
    projectId
  );
  const removeContributorPermission = useCheckPermission(
    EContributorAction.REMOVE,
    projectId
  );

  const { mutate: updateRole } = useUpdateProjectContributorRole();
  const [UpdateConfirmation, updateConfirmation] = useConfirm({
    title: "Update contributor role",
    message:
      "Are you sure you want update the role of this contributor for this project?",
    variant: "primary",
  });
  const handleRoleChange = async (role: EProjectRole) => {
    const result = await updateConfirmation();
    if (result) updateRole({ projectId, userId, role });
  };

  const { mutate: deleteContributor } = useDeleteContributor();
  const [DeleteConfirmation, deleteConfirmation] = useConfirm({
    title: "Remove contributor",
    message: "Are you sure you want to remove this contributor?",
    variant: "destructive",
    onConfirm: () => deleteContributor({ projectId, userId }),
  });

  return (
    <DropdownMenu>
      <UpdateConfirmation />
      <DeleteConfirmation />
      <DropdownMenuTrigger asChild>
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem disabled>
          Go to Profile
          <ExternalIcon />
        </DropdownMenuItem>

        {editRolePermission && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Change role to</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => handleRoleChange(EProjectRole.LEAD)}
                >
                  Lead
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleRoleChange(EProjectRole.MANAGER)}
                >
                  Manager
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleRoleChange(EProjectRole.DEVELOPER)}
                >
                  Developer
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        )}

        {removeContributorPermission && (
          <DropdownMenuItem
            className="text-red-500"
            onClick={deleteConfirmation}
          >
            Remove from project
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
