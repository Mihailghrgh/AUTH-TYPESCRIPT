"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { resetPassword } from "@/lib/api";
import {
  Form,
  FormItem,
  FormDescription,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "../ui/form";
import { TriangleAlert } from "lucide-react";
import ResetPasswordConfirmation from "./resetPasswordSuccess";
import { Params } from "next/dist/server/request/params";
import { OK } from "@/utils/httpStatusCode";
import FormSuccess from "./FormSuccess";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must have a maximum of 50 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must have a maximum of 50 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

const ResetPasswordForm = ({ code }: { code: string }) => {
  const [error, setError] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<boolean>(false);
  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      const data = { password: values.password, verificationCode: code };
      const response = await resetPassword(data);

      if (response.status === OK) {
        setActivePage((data) => !data);
      }
    } catch (error) {
      console.log(error);
      setError((data) => !data);
    }
  };
  return activePage === false ? (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            {error && (
              <div className="bg-red-300 rounded-xl w-fit border-12 border-red-300 flex justify-center  text-center items-center">
                <TriangleAlert className="h-4 w-4" /> <p> Error!</p>{" "}
              </div>
            )}
            <CardTitle className="text-2xl font-bold text-center">
              Reset Password
            </CardTitle>
            <CardDescription className="text-center">
              Enter your new password to get access to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...resetPasswordForm}>
              <form
                onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={resetPasswordForm.control}
                  name="password"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="************"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is a test message.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={resetPasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="************"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is a test message.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <div className="flex flex-col justify-center items-center space-y-2">
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full hover:cursor-pointer"
                  >
                    Submit
                  </Button>

                  <Button
                    variant="default"
                    type="button"
                    className="flex flex-col justify-center items-center w-full hover:cursor-pointer"
                  >
                    <Link href="/auth/login">Back to login</Link>
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      ;
    </>
  ) : (
    <>
      <FormSuccess />
    </>
  );
};
export default ResetPasswordForm;
