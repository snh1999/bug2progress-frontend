"use client";
import { useLogOut } from "@/api/auth/auth";
// import { useGetCurrentUser } from "@/api/users/users";
import Header from "@/components/common/header/header";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  // useGetCurrentUser();

  const { mutate: logOut, isPending } = useLogOut();

  return (
    <>
      <Header>
        <Button disabled={isPending} onClick={async () => await logOut()}>
          Log Out
        </Button>
      </Header>
      <div className="flex gap-4">
        <Button>primary</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="link">link</Button>
        <Button variant="outline">outline</Button>
        <Button variant="linkButton">button link</Button>
      </div>
    </>
  );
}
