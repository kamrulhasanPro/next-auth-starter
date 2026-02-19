"use client"
import { useSession } from "next-auth/react";
import React from "react";

const UserCard = () => {
  const session = useSession();
  console.log(session);

  return (
    <div>
      <h3 className="text-2xl font-semibold">User - client</h3>
      <p className="p-2 border-white border-2">{JSON.stringify(session)}</p>
    </div>
  );
};

export default UserCard;
