"use server";

import ErrorBlock from "@/components/utils/ErrorBlock";
import ResetPasswordForm from "@/components/utils/resetPasswordForm";
import { checkResetCode } from "@/lib/api";
import { SearchParams } from "next/dist/server/request/search-params";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ code: string; exp: string }>;
  searchParams: Promise<{ code?: string; exp?: string }>;
}) {
  try {
    const data = await searchParams;
    const response = await checkResetCode(data);
    return <ResetPasswordForm code={data.code || ""} />;
  } catch (error) {
    console.log(error);
    return <ErrorBlock message="Invalid reset link or expired" />;
  }
}
export default page;
