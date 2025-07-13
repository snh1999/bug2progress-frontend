"use client";
import React from "react";
import { useGetProjects } from "@/api/projects/projects";
import { CardList } from "@/components/common/DataView/CardList/CardList";
import LoadingComponent from "@/components/common/LoadingComponent";

export default function Home() {
  const {data} = useGetProjects();

  if (!data) {
    return <LoadingComponent/>;
  }

  const cardListData = data.map((item) => ({
    title: item.title,
    summary: item.summary,
    id: item.id,
  }));

  return <>
    <CardList listItems={cardListData}/>
  </>;
}
