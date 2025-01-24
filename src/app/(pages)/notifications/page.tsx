import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCheckIcon, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Page() {
  return (
    <div className="pt-[48px] max-w-6xl mx-auto min-h-[calc(100dvh-48px)] bg-zinc-background">
      <div className="commands px-6 pt-6">
        <Button size="sm" className="border" variant="ghost">
          Mark all as read <CheckCheckIcon />
        </Button>
      </div>
      <div className="py-6 px-6 space-y-6">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
