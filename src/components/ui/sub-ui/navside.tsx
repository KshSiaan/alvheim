"use client";
import { Dispatch, SetStateAction } from "react";

import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  User,
  PenSquare,
  MessageCircle,
  Users,
  Settings,
  LogOut,
  BellIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/create-post", label: "Create Post", icon: PenSquare },
  { href: "/notifications", label: "Notifications", icon: BellIcon },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/friends", label: "Friends", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface NavsideProps {
  navToggle: Dispatch<SetStateAction<boolean>>;
  navState: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Navside({ navToggle, navState }: NavsideProps) {
  const navig = useRouter();
  return (
    <SheetContent
      side="right"
      className="w-64 p-0 bg-zinc-200 dark:bg-zinc-900"
    >
      <SheetHeader className="p-6">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      <ScrollArea className="h-[calc(100vh-5rem)] px-6">
        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={() => navToggle(false)}
              >
                <link.icon size={20} />
                {link.label}
              </Button>
            </Link>
          ))}
          <Button
            variant="default"
            className="w-full justify-start gap-2"
            onClick={() => {
              navToggle(false);
              navig.push("/login");
            }}
          >
            <LogOut size={20} />
            Log out
          </Button>
        </nav>
      </ScrollArea>
    </SheetContent>
  );
}
