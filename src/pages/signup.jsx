import React from "react";
import rsuLogo from "../assets/rsu-logo.png";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useAuthhook from "@/hooks/useAuthHook";

const SignupPage = () => {
  const { handleSignupChange, handleSignupSubmit, setSignupPayload } = useAuthhook(); // prettier-ignore

  return (
    <div className="w-100 lg:px-12 lg:w-1/3 md:w-2/4 px-8 sm:px-0 sm:w-2/3 m-auto text-center flex flex-col justify-center h-screen">
      <img src={rsuLogo} className="h-[100px] mb-2 mx-auto w-[100px]" alt="" />
      <p className="text-3xl mb-1">Hola Admin!</p>
      <p className="text-sm text-gray-500">
        Fill up the following to create an account.
      </p>

      <form
        className="flex flex-col gap-2 justify-center my-12"
        action=""
        onSubmit={handleSignupSubmit}
      >
        <Input
          className="focus-visible:ring-transparent"
          placeholder="Email"
          type="email"
          onChange={(e) => handleSignupChange(e, "email")}
        />
        <Input
          className="focus-visible:ring-transparent"
          placeholder="Full name"
          type="text"
          autoComplete="off"
          onChange={(e) => handleSignupChange(e, "fullname")}
        />
        <Input
          className="focus-visible:ring-transparent"
          placeholder="Password"
          type="password"
          autoComplete="new-password"
          onChange={(e) => handleSignupChange(e, "password")}
        />
        <Input
          className="focus-visible:ring-transparent"
          placeholder="Re-type your password here"
          type="password"
          autoComplete="new-password"
          onChange={(e) => handleSignupChange(e, "confpass")}
        />

        <div className="items-center text-left flex space-x-2 mt-4 mb-4">
          <Checkbox
            id="terms"
            className=""
            onClick={() => {
              setSignupPayload((prev) => ({
                ...prev,
                agree: !prev["agree"],
              }));
            }}
          />
          <label
            htmlFor="terms"
            className="text-xs leading-none select-none text-gray-500"
          >
            I agree to the{" "}
            <a href="" className="text-[#3d9f7f] font-medium hover:underline">
              Terms and conditions
            </a>{" "}
            and{" "}
            <a href="" className="text-[#3d9f7f] font-medium hover:underline">
              Privacy policy.
            </a>
          </label>
        </div>

        <Button className="mt-6 hover:bg-[#2c745c] bg-[#3d9f7f]">
          Create an account
        </Button>
      </form>

      <p className="text-sm text-gray-500 text-center">
        Already have an account?{" "}
        <Link to="/" className="text-[#3d9f7f] font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
