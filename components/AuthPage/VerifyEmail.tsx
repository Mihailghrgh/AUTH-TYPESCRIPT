"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { verifyEmail } from "@/lib/api";
import { SkeletonCard } from "../utils/loadingSkeleton";

export default function VerificationSuccess() {
  const { code } = useParams();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code),
  });

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (isError) {
    console.log("Error: ", error);
    return <SkeletonCard error={error}/>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Account Verified!
          </CardTitle>
          <CardDescription className="text-center">
            Your email has been successfully verified
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-600">
            Thank you for verifying your email address. Your account is now
            active and you can sign in to access your dashboard.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
