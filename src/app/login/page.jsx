import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import React from "react";
import { SiAuthelia } from "react-icons/si";

const LoginPage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const callbackUrl = resolvedSearchParams?.callbackUrl || "/";

  return (
    <div className="px-5 py-8 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="flex-2 col-span-2">
        <h2 className="text-2xl mb-5 font-bold border-l-8 pl-5 ">
          Welcome to Login Page
        </h2>
        <LoginForm callbackUrl={callbackUrl} />
      </div>

      <div className="flex-1 bg-gray-900 rounded text-white flex items-center justify-center flex-col gap-5">
        <SiAuthelia size={100} className=" animate-pulse" />
        <Link href={"/register"} className="btn">
          Do not have a account?
        </Link>
        <Link href={"/"} className="btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
