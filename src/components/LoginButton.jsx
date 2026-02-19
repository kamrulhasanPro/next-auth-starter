"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const LoginButton = () => {
  const session = useSession();
  function handleLogin() {
    signIn();
  }
  function handleLogout() {
    signOut();
  }
  return session.status === "authenticated" ? (
    <button className="btn" onClick={handleLogout}>
      Logout
    </button>
  ) : (
    <button className="btn" onClick={handleLogin}>
      Login Now
    </button>
  );
};

export default LoginButton;
