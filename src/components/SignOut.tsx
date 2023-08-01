"use client";
import React from "react";
import { signOut } from "next-auth/react";

function SignOut() {
  return <div onClick={() => signOut({ callbackUrl: "/" })}>SignOut</div>;
}

export default SignOut;
