"use client";

import { useGetAdminStats } from "@/api/admin/admin";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogoutButton from "@/components/common/LogoutButton";
import { ThemeToggle } from "@/components/common/themes/ThemeToggle";
import UsersTable from "@/components/admin/UsersTable";
import OrgsTable from "@/components/admin/OrgsTable";
import ProjectsTable from "@/components/admin/ProjectsTable";
import TicketsTable from "@/components/admin/TicketsTable";
import FeaturesTable from "@/components/admin/FeaturesTable";
import PostsTable from "@/components/admin/PostsTable";
import LoadingComponent from "@/components/common/LoadingComponent";

export default function AdminPage() {
  const { data: stats, isLoading: isLoadingStats } = useGetAdminStats();

  if (!stats || isLoadingStats) {
    return <LoadingComponent />;
  }

  const elements = [
    {
      count: stats.users,
      TableComponent: <UsersTable />,
      title: "Users",
    },
    {
      title: "Organizations",
      TableComponent: <OrgsTable />,
      count: stats.organizations,
    },
    {
      title: "Projects",
      TableComponent: <ProjectsTable />,
      count: stats.projects,
    },
    {
      title: "Tickets",
      TableComponent: <TicketsTable />,
      count: stats.tickets,
    },
    {
      title: "Features",
      TableComponent: <FeaturesTable />,
      count: stats.features,
    },
    {
      title: "Posts",
      TableComponent: <PostsTable />,
      count: stats.posts,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="flex gap-2">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {elements.map((element) => (
          <div
            key={element.title}
            className="p-4 border rounded-lg bg-card text-center"
          >
            <div className="text-3xl font-bold">{element.count}</div>
            <div className="text-sm text-muted-foreground">{element.title}</div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="Users" className="w-full">
        <TabsList className="w-full flex-wrap">
          {elements.map((element) => (
            <TabsTrigger
              key={element.title}
              value={element.title}
            >{`${element.title} (${element.count})`}</TabsTrigger>
          ))}
        </TabsList>

        {elements.map((element) => (
          <TabsContent
            key={element.title}
            value={element.title}
            className="mt-4"
          >
            {element.TableComponent}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
