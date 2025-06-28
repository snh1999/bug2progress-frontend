"use client";
import { useGetCurrentUser } from "@/api/users/users";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  useGetCurrentUser();

  return (
    <div className="flex gap-4">
      <Button>primary</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="link">link</Button>
      <Button variant="outline">outline</Button>
      <Button variant="linkButton">button link</Button>
    </div>
  );
}
