"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const LogoutButton = () => {
  const session = useSession();

  function handleLogout() {
    signOut();
  }
  return (
    session.status === "authenticated" && (
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    )
  );
};

export default LogoutButton;
