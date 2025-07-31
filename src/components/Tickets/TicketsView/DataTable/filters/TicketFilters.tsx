import { FolderIcon, UserIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DatePicker } from "@/components/common/DatePicker";
import { ETicketPriority, ETicketStatus, ETicketType } from "@/api/tickets/tickets.types";
import { useGetProjectContributors } from "@/api/projects/projectContributors";
import { useGetFeatures } from "@/api/features/features";
import { useProjectId } from "@/hooks/useProjectId";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";
import { useTicketFilters } from "@/hooks/useTicketFilters";
import { TProjectContributorWithUser } from "@/api/projects/projects.types";
import { Button } from "@/components/ui/button";

import { RxCross2 } from "react-icons/rx";
import { GrInProgress, GrUserWorker } from "react-icons/gr";
import { FcHighPriority } from "react-icons/fc";
import { MdVerifiedUser } from "react-icons/md";
import { FaListOl } from "react-icons/fa6";


import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingComponent from "@/components/common/LoadingComponent";
import { toast } from "sonner";

interface TicketFiltersProps {
  hideFeatureFilter?: boolean;
}

export const TicketFilters = ({hideFeatureFilter}: TicketFiltersProps) => {
  const projectId = useProjectId();
  const router = useRouter();
  const pathName = usePathname();
  const paramSize= useSearchParams().size;

  const {data: features, error: featuresError, isLoading: isLoadingProjects} = useGetFeatures(projectId);
  const {data: contributors, error: contributorsError, isLoading: isLoadingMembers} = useGetProjectContributors({id: projectId});

  const featureOptions = features?.map((project) => ({
    value: project.id,
    label: project.title,
  }));


  const [{
    featureId,
    dueAt
  }, setFilters] = useTicketFilters();


  const onFeatureChange = (value: string) => {
    setFilters({featureId: value === "all" ? null : value as string});
  };

  if (isLoadingProjects || isLoadingMembers) return <LoadingComponent/>;
  if(contributorsError) {
    toast.error(contributorsError.message);
    return null;
  }

  if(featuresError) {
    toast.error(featuresError.message);
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      {paramSize > 0 && <Button onClick={() => router.replace(pathName)} variant="outline" className="text-red-800 dark:text-red-400">
        <RxCross2 className="size-4"/>
        Clear
      </Button>}

      <DatePicker
        placeholder="Due date"
        className="h-8 w-full lg:w-auto"
        value={dueAt ? new Date(dueAt) : undefined}
        onChange={(date) => {
          setFilters({dueAt: date ? date.toISOString() : null});
        }}
      />

      <TicketStatusFilter/>
      <TicketTypeFilter/>
      <TicketPriorityFilter/>
      {contributors && <ContributorFilters contributors={contributors}/>}


      {!hideFeatureFilter && (
        <Select
          defaultValue={featureId ?? undefined}
          onValueChange={(value) => onFeatureChange(value)}
        >
          <SelectTrigger className="w-full lg:w-auto h-8">
            <div className="flex items-center pr-2">
              <FolderIcon className="size-4 mr-2"/>
              <SelectValue placeholder="Features"/>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectSeparator/>
            {featureOptions?.map((project) => (
              <SelectItem key={project.value} value={project.value}>
                {project.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};


function TicketStatusFilter() {
  const [{
    ticketStatus,
  }, setFilters] = useTicketFilters();
  return (
    <Select
      defaultValue={ticketStatus ?? undefined}
      onValueChange={(value) => setFilters({ticketStatus: value === "all" ? null : value as ETicketStatus})
      }
    >
      <SelectTrigger className="w-full lg:w-auto h-8">
        <div className="flex items-center pr-2">
          <GrInProgress className="size-4 mr-2"/>
          <SelectValue placeholder="Status"/>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectSeparator/>
        {Object.values(ETicketStatus).map((status) => (
          <SelectItem key={status} value={status}>
            {convertSnakeCaseToTitleCase(status)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function TicketTypeFilter() {
  const [{
    ticketType,
  }, setFilters] = useTicketFilters();
  return (
    <Select
      defaultValue={ticketType ?? undefined}
      onValueChange={(value) => setFilters({ticketType: value === "all" ? null : value as ETicketType})
      }
    >
      <SelectTrigger className="w-full lg:w-auto h-8">
        <div className="flex items-center pr-2">
          <FaListOl className="size-4 mr-2"/>
          <SelectValue placeholder="Type"/>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectSeparator/>
        {Object.values(ETicketType).map((type) => (
          <SelectItem key={type} value={type}>
            {convertSnakeCaseToTitleCase(type)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function TicketPriorityFilter() {
  const [{
    ticketPriority,
  }, setFilters] = useTicketFilters();
  return (
    <Select
      defaultValue={ticketPriority ?? undefined}
      onValueChange={(value) => setFilters({ticketPriority: value === "all" ? null : value as ETicketPriority})
      }
    >
      <SelectTrigger className="w-full lg:w-auto h-8">
        <div className="flex items-center pr-2">
          <FcHighPriority className="size-4 mr-2"/>
          <SelectValue placeholder="Priority"/>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectSeparator/>
        {Object.values(ETicketPriority).map((type) => (
          <SelectItem key={type} value={type}>
            {convertSnakeCaseToTitleCase(type)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ContributorFilters({contributors}: { contributors: TProjectContributorWithUser[] }) {
  const contributorOptions = contributors.map((member) => ({
    value: member.userId,
    label: `${member.user.profile.name} (${member.user.profile.username})`,
  }));

  const [{
    verifierId,
    creatorId,
    assignedContributorId,
  }, setFilters] = useTicketFilters();

  if (contributors.length === 0) {
    return null;
  }

  return (
    <>
      <Select
        defaultValue={assignedContributorId ?? undefined}
        onValueChange={(value) =>
          setFilters({assignedContributorId: value === "all" ? null : value as string})
        }
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <GrUserWorker className="size-4 mr-2"/>
            <SelectValue placeholder="Assignees"/>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectSeparator/>
          {contributorOptions.map((contributor) => (
            <SelectItem key={contributor.value} value={contributor.value}>
              {contributor.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={creatorId ?? undefined}
        onValueChange={(value) =>
          setFilters({creatorId: value === "all" ? null : value as string})
        }
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <UserIcon className="size-4 mr-2"/>
            <SelectValue placeholder="Author"/>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectSeparator/>
          {contributorOptions.map((contributor) => (
            <SelectItem key={contributor.value} value={contributor.value}>
              {contributor.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={verifierId ?? undefined}
        onValueChange={(value) =>
          setFilters({verifierId: value === "all" ? null : value as string})
        }
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <MdVerifiedUser className="size-4 mr-2"/>
            <SelectValue placeholder="Verifier"/>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectSeparator/>
          {contributorOptions.map((contributor) => (
            <SelectItem key={contributor.value} value={contributor.value}>
              {contributor.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}


