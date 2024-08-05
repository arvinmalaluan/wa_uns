import React, { useState } from "react";
import rsu_logo from "../assets/rsu-logo.png";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOutUser } from "@/firebase/authentication";

const NavigationBar = () => {
  const { pathname } = useLocation();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="sticky top-0 flex items-center justify-between px-4 py-4 bg-white sm:px-8">
      <div className="flex items-center gap-4">
        <img src={rsu_logo} className="h-[40px] w-[40px]" alt="" />
        <div>
          <p className="text-sm font-semibold">RSU Main Campus</p>
          <p className="text-xs">School Campus Map</p>
        </div>
      </div>

      <div className="hidden gap-8 text-sm md:items-center md:flex">
        <Link to="/home">Home</Link>
        <Link to="/building">Manage Buildings</Link>
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button>Logout</button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Logging out will remove your
                session. You must log in again the next time you access the
                system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={signOutUser}>
                Yes, I want to logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {!isDesktop && (
        <Sheet>
          <SheetTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <div className="flex items-center gap-2">
                <img src={rsu_logo} className="h-[50px] w-[50px]" alt="" />
                <div className="text-left">
                  <p className="font-medium">RSU Admin</p>
                  <p className="text-sm text-gray-500">Manage Profile</p>
                </div>
              </div>

              <div className="flex flex-col pt-6 text-left">
                <p className="mb-2 text-sm text-gray-500">Navigation Links</p>
                <Link
                  className={`py-1 ${
                    pathname.includes("home")
                      ? "text-black font-medium"
                      : "text-gray-500"
                  }`}
                  to="/home"
                >
                  Home
                </Link>
                <Link
                  className={`py-1 ${
                    pathname.includes("building")
                      ? "text-black font-medium"
                      : "text-gray-500"
                  }`}
                  to="/building"
                >
                  Manage Buildings
                </Link>
                <Link
                  className={`py-1 ${
                    pathname.includes("about")
                      ? "text-black font-medium"
                      : "text-gray-500"
                  }`}
                  to="/about"
                >
                  About
                </Link>
                <button onClick={signOutUser}>Logout</button>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default NavigationBar;
