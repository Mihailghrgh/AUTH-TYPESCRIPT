"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { register } from "../../lib/api";
import { useState } from "react";
import RegistrationConfirmation from "./registerFormSuccess";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Please enter a valid name" })
      .max(50, { message: "Name exceeds limit of 50 character" }),
    email: z
      .string()
      .email({ message: "Email must contain '@' " })
      .min(6, { message: "Email must be between 6 and 50 character" })
      .max(50, { message: "Email must be between 6 and 50 character" }),
    password: z
      .string()
      .min(6, { message: "Password must contain at least 6 characters" })
      .max(50, { message: "Password must contain max 50 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must contain at least 6 characters" })
      .max(50, { message: "Password must contain max 50 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match !",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const [activePage, setActivePage] = useState(true);
  // 1. Define your form.
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {

    try {
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.password,
      };

      const response = await register(data);

      if (response.status === 201) {
        setActivePage(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return activePage ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane doe" {...field} />
                      </FormControl>
                      <FormDescription>This is a test message.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="jane_doe@gmail.com" {...field} />
                      </FormControl>
                      <FormDescription>This is a test message.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This is a test message.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This is a test message.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col justify-center items-center">
                <Button type="submit" className="w-full">
                  Submit
                </Button>
                <h1 className="text-sm mt-4">
                  {" "}
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    login!
                  </Link>
                </h1>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  ) : (
    <>
      <RegistrationConfirmation />
    </>
  );
}
