import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies, headers } from "next/headers";
import React from "react";

export default async function Page() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const origin = `${protocol}://${host}`;

  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const call = await fetch(`${origin}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  });
  const { user } = await call.json();

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
              <AvatarImage
                src={
                  user.profile_picture
                    ? `/api/profile-picture/${user._id}`
                    : undefined
                }
                alt={user.username}
              />
              <AvatarFallback>
                {user.first_name[0]}
                {user.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl sm:text-3xl font-bold">
                {user.first_name} {user.last_name}
              </CardTitle>
              <p className="text-muted-foreground">@{user.username}</p>
              <Badge variant="outline" className="mt-2">
                {user.role}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Contact Information
                </h3>
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Account Details</h3>
                <p>
                  <span className="font-medium">Member since:</span>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Last login:</span>{" "}
                  {new Date(user.last_login).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Bio</h3>
              <p>{user.bio || "No bio provided."}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-semibold text-2xl">{user.followers_count}</p>
                <p className="text-muted-foreground">Followers</p>
              </div>
              <div>
                <p className="font-semibold text-2xl">{user.following_count}</p>
                <p className="text-muted-foreground">Following</p>
              </div>
              <div>
                <p className="font-semibold text-2xl">{user.posts_count}</p>
                <p className="text-muted-foreground">Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
