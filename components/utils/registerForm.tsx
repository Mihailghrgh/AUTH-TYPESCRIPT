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
import { login, register } from "../../lib/api";
import { useRouter } from "next/navigation";
import { CREATED } from "@/utils/httpStatusCode";

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

  const route = useRouter();

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log(values);

    try {
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.password,
      };

      const response = await register(data);

      if (response.status === 201) {
        console.log("passed");
        route.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
                <Input placeholder="*********" type="password" {...field} />
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
                <Input placeholder="*********" type="password" {...field} />
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
              href="/auth/register"
              className="text-blue-600 hover:text-blue-800"
            >
              login!
            </Link>
          </h1>
        </div>
      </form>
    </Form>
  );
}
