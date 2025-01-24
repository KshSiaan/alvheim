import React from "react";
import Feed from "./feed";
import { Card } from "@/components/ui/card";
import { MessageCircleIcon, SquarePenIcon, UsersIcon } from "lucide-react";

export default function Page() {
  return (
    <main className="pt-[48px] flex flex-row justify-start items-start">
      {/* Left Sidebar */}
      <div className="sticky top-[48px] h-[calc(100vh-48px)] w-[240px] bg-transparent"></div>

      {/* Main Content */}
      <div className="w-[calc(100vw-480px)] bg-zinc-200 dark:bg-zinc-800">
        <div className="h-[76px] w-full py-4 px-4">
          <div className="h-full w-full grid grid-flow-col grid-cols-3 gap-4">
            <TopCard>
              <SquarePenIcon className="h-5 w-5" />
              Create Post
            </TopCard>
            <TopCard>
              <UsersIcon className="h-5 w-5" />
              Friends
            </TopCard>
            <TopCard>
              <MessageCircleIcon className="h-5 w-5" />
              Send a message
            </TopCard>
          </div>
        </div>
        <Feed />
      </div>

      {/* Right Sidebar */}
      <div className="sticky top-[48px] h-[calc(100vh-48px)] w-[240px] bg-transparent"></div>
    </main>
  );
}

function TopCard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Card className="p-4 cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:shadow-md dark:bg-zinc-900 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:hover:text-zinc-200">
      {children}
    </Card>
  );
}
