"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignOut from "@/components/SignOut";

function Page() {
  const { data, status } = useSession();

  return (
    <div>
      <p>Olá, {data?.user?.name}</p>
      <SignOut />
    </div>
  );
}

export default Page;
