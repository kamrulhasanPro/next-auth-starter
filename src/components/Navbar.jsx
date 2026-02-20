import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <nav className="shadow shadow-white">
      <ul className="flex items-center justify-center gap-4 my-2">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/private"}>Private</Link>
        </li>
        <li>
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
        <li>
            <LogoutButton/>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
