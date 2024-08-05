import React from "react";
import rsuLogo from "../assets/rsu-logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useAuthhook from "@/hooks/useAuthHook";

const SigninPage = () => {
  const { handleSigninChange, handleSigninSubmit } = useAuthhook();

  return (
    <div className="w-100 lg:w-1/3 md:w-2/4 lg:px-12 px-8 sm:px-0 sm:w-2/3 m-auto text-center flex flex-col justify-center h-screen">
      <img src={rsuLogo} className="h-[100px] mb-2 mx-auto w-[100px]" alt="" />
      <p className="text-3xl mb-1">Hola Admin!</p>
      <p className="text-sm text-gray-500">Sign in to continue</p>

      <form
        className="flex flex-col gap-2 justify-center my-12"
        action="POST"
        onSubmit={handleSigninSubmit}
      >
        <Input
          className="focus-visible:ring-transparent"
          placeholder="Email"
          type="email"
          autoComplete="off"
          onChange={(e) => handleSigninChange(e, "email")}
        />
        <Input
          className="focus-visible:ring-transparent"
          placeholder="Password"
          type="password"
          autoComplete="new-password"
          onChange={(e) => handleSigninChange(e, "password")}
        />
        <a
          href=""
          className="text-sm text-right text-[#3d9f7f] font-medium hover:underline"
        >
          Forgotten password?
        </a>

        <Button className="mt-6 hover:bg-[#2c745c] bg-[#3d9f7f]">
          Sign in
        </Button>
      </form>

      <p className="text-sm text-gray-500 text-center">
        Not yet a member?{" "}
        <Link
          to="/signup"
          className="text-[#3d9f7f] font-medium hover:underline"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default SigninPage;
