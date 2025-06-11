"use server";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import SignInPage from "@/components/AuthPage/Login";
import LandingPage from "@/components/FrontPage/LandingPage";

export default async function Home() {
  return <LandingPage/>
}
