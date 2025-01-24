import Link from "next/link";
import React from "react";
import Image from "next/image";
import { RegisterForm } from "@/components/register-form";
export default function Page() {
  return (
    <main className="min-h-screen w-screen bg-zinc-200 dark:bg-background">
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="font-la_belle text-2xl">
              <Image
                src="/logo.svg"
                height="43"
                width="85"
                alt="logo"
                className="h-[43px] w-[85px] select-none"
              />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs overflow-hidden">
              <RegisterForm />
            </div>
          </div>
        </div>
        <div className="bg-zinc-300 dark:bg-zinc-900 h-full w-full flex flex-col justify-center items-center">
          <div className="">
            <Image
              src="/register-bg.svg"
              height="512"
              width="512"
              className="h-[200px] w-[200px] rounded-full"
              alt="thumbnail"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
