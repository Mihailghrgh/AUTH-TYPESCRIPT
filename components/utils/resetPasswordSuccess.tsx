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

export default function ResetPasswordConfirmation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Password Reset Form has been submitted!
          </CardTitle>
          <CardDescription className="text-center">
            We've sent a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-600">
            Please check your inbox and click on the verification link to
            reset your password.
          </p>
          <p className="text-sm text-gray-500">
            If you don't see the email, please check your spam folder or request
            a new reset password link.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full hover:cursor-pointer" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          <Button variant="outline" className="w-full hover:cursor-pointer">
            <Link href="#">Resend Verification Email</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
