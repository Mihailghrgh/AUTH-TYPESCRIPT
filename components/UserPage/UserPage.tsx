"use client";
import {  userSessions } from "@/lib/api";
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

const mockSessions = [
  {
    id: 1,
    device: "Chrome on Windows",
    ip: "192.168.1.1",
    lastActive: "2025-06-11T15:30:00",
  },
  {
    id: 2,
    device: "Safari on iPhone",
    ip: "192.168.1.2",
    lastActive: "2025-06-10T09:15:00",
  },
];

const mockPreviousLogins = [
  {
    id: 1,
    date: "2025-06-09T14:22:00",
    device: "Chrome on Windows",
    ip: "192.168.1.1",
    status: "Success",
  },
  {
    id: 2,
    date: "2025-06-08T10:45:00",
    device: "Safari on iPhone",
    ip: "192.168.1.2",
    status: "Success",
  },
  {
    id: 3,
    date: "2025-06-07T18:30:00",
    device: "Firefox on Mac",
    ip: "192.168.1.3",
    status: "Success",
  },
];

type DetailType = "sessions" | "logins" | null;

export default function UserPage() {
  const { user, setUser } = UserStore();
  console.log(user);
  
  const [activeDetail, setActiveDetail] = useState<DetailType>(null);
  const router = useRouter();

  // Mock user data - in a real app, this would come from your auth system

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/");
  };

  const getUserData = async () => {
    try {
      const response = await userSessions();
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error } = useQuery({
    queryKey: ["user"],
    staleTime: Infinity,
    queryFn: getUserData,
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome, {user?.email}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
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
            <Button
              variant={activeDetail === "logins" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => setActiveDetail("logins")}
            >
              Previous Logins
            </Button>
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
              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>
                    All devices currently logged into your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSessions.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{session.device}</p>
                            <p className="text-sm text-gray-500">
                              IP: {session.ip}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            Last active:{" "}
                            {new Date(session.lastActive).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeDetail === "logins" && (
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
            )}

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
