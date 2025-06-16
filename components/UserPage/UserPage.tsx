"use client";
import { userSessions } from "@/lib/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cookies } from "next/headers";
import { useQuery } from "@tanstack/react-query";
import { UserStore } from "@/store/UserStore";
import PreviousUserSessions from "./PreviousUserSessions";
import { logout } from "@/lib/api";

type DetailType = "sessions" | "logins" | null;

export default function UserPage() {
  const { user, setUser } = UserStore();
  console.log(user);

  const [activeDetail, setActiveDetail] = useState<DetailType>(null);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const getUserData = async () => {
    try {
      const response = await userSessions();
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["user"],
    staleTime: Infinity,
    queryFn: getUserData,
  });

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (isError) {
    console.log(error);
    return <div>Error occurred</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-2xl">
              Welcome, {data?.data.foundUser.email}
            </CardTitle>
            <CardDescription>ID: {data?.data.foundUser.userId}</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left sidebar with buttons */}
          <div className="space-y-4">
            <Button
              variant={activeDetail === "sessions" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => setActiveDetail("sessions")}
            >
              User Sessions
            </Button>
            {/* <Button
              variant={activeDetail === "logins" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => setActiveDetail("logins")}
            >
              Previous Logins
            </Button> */}
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>

          {/* Right content area */}
          <div className="md:col-span-2">
            {activeDetail === "sessions" && (
              <PreviousUserSessions userId={data?.data.foundUser.userId} />
            )}

            {/* {activeDetail === "logins" && (
              <Card>
                <CardHeader>
                  <CardTitle>Previous Logins</CardTitle>
                  <CardDescription>
                    Recent login activity on your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPreviousLogins.map((login) => (
                      <div key={login.id} className="border rounded-lg p-4">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{login.device}</p>
                            <p className="text-sm text-gray-500">
                              IP: {login.ip}
                            </p>
                            <p className="text-sm text-gray-500">
                              Status: {login.status}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(login.date).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )} */}

            {!activeDetail && (
              <div className="flex items-center justify-center h-full min-h-[200px] border rounded-lg bg-white">
                <p className="text-gray-500">
                  Select an option to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
