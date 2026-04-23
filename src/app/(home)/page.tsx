"use client";
import { useGetProjects, useGenerateDemo } from "@/api/projects/projects";
import LoadingComponent from "@/components/common/LoadingComponent";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project/ProjectCard";

export default function Home() {
  const { data } = useGetProjects();
  const generateDemo = useGenerateDemo();

  if (!data) {
    return <LoadingComponent />;
  }

  if (data.length === 0) {
    return (
      <div className="mt-10 h-full flex flex-col items-center justify-center gap-4">
        <span className="text-xl text-muted-foreground italic">
          No projects found. You can generate some demo data to play with
        </span>
        <Button
          onClick={() => generateDemo.mutate(false)}
          disabled={generateDemo.isPending}
        >
          {generateDemo.isPending ? "Generating..." : "Generate Demo"}
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 px-4 lg:px-6">
        {data.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </>
  );
}
