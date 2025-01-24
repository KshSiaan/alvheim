"use client";
import Link from "next/link";
import React from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import Navside from "./navside";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  return (
    <nav className="h-[48px] w-full fixed z-30 top-0 left-0 bg-background shadow px-[16%] flex flex-row justify-between items-center">
      <Link href="/" className="font-la_belle text-2xl">
        <Image
          src="/logo.svg"
          height="43"
          width="85"
          alt="logo"
          className="h-[43px] w-[85px] select-none"
        />
      </Link>

      <div className="grid grid-flow-col justify-normal items-center space-x-4">
        <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
          Guest
        </p>
        <Sheet>
          <SheetTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <Navside navToggle={setOpen} navState={open} />
        </Sheet>
      </div>
    </nav>
  );
}
