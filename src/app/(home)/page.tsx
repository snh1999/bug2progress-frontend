"use client";
import React from "react";
import { useGetProjects } from "@/api/projects/projects";
import LoadingComponent from "@/components/common/LoadingComponent";
import { CardItem } from "@/components/common/dataView/CardList/CardItem";
import { PROJECTS_PATH } from "@/app.constants";
import Link from "next/link";

export default function Home() {
  const { data } = useGetProjects();

  if (!data) {
    return <LoadingComponent />;
  }
  if (data.length === 0) {
    return (
      <span className="mt-10 h-full text-semibold text-xl text-muted-foreground text-center italic">
        No projects found
      </span>
    );
  }

  const cardListData = data.map((item) => ({
    title: item.title,
    summary: item.summary,
    id: item.id,
  }));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 px-4 lg:px-6">
        {cardListData.map((item) => (
          <Link key={item.id} href={`${PROJECTS_PATH}/${item.id}`}>
            <CardItem {...item} />
          </Link>
        ))}
      </div>
    </>
  );
}
