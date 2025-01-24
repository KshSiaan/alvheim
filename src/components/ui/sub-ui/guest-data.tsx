"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CopyIcon, CheckIcon } from "lucide-react";

export default function GuestData() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  const copyToClipboard = async (
    text: string,
    setCopied: (value: boolean) => void
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Guest Credentials</h2>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell className="font-medium">Email:</TableCell>
            <TableCell>guest@guest.com</TableCell>
            <TableCell>
              <Button
                onClick={() =>
                  copyToClipboard("guest@guest.com", setEmailCopied)
                }
                size="icon"
                variant="ghost"
              >
                {emailCopied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {emailCopied ? "Copied" : "Copy email"}
                </span>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-transparent">
            <TableCell className="font-medium">Password:</TableCell>
            <TableCell>guest1234</TableCell>
            <TableCell>
              <Button
                onClick={() => copyToClipboard("guest1234", setPasswordCopied)}
                size="icon"
                variant="ghost"
              >
                {passwordCopied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {passwordCopied ? "Copied" : "Copy password"}
                </span>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
