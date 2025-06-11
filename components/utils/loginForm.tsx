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
import { login } from "../../lib/api";
import { useRouter } from "next/navigation";
import { OK } from "@/utils/httpStatusCode";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Email must contain '@' " })
    .min(6, { message: "Email must be between 6 and 50 character" })
    .max(50, { message: "Email must be between 6 and 50 character" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" })
    .max(50, { message: "Password must contain max 50 characters" }),
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const route = useRouter();

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const data = {
        email: values.email,
        password: values.password,
        confirmPassword: values.password,
      };

      const response = await login(data);

      console.log(response.status);

      const statusCode = Number(response.status);
      console.log(statusCode);

      if (response.status === OK) {

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
              <h1 className="text-sm text-blue-600 text-end">
                <Link href="/password/forgot">forgot password</Link>
              </h1>
            </FormItem>
          )}
        />
        <div className="flex flex-col justify-center items-center">
          <Button type="submit" className="w-full">
            Submit
          </Button>
          <h1 className="text-sm mt-4">
            {" "}
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:text-blue-800"
            >
              register!
            </Link>
          </h1>
        </div>
      </form>
    </Form>
  );
}
