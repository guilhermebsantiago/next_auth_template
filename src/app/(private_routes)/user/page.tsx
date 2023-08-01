"use client";
import { useSession } from "next-auth/react";
import React from "react";
import SignOut from "../../../components/SignOut";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <div>
      {" "}
      <p>Olá, {data?.user?.name}</p>
      <SignOut />
    </div>
  );
}

export default Page;
