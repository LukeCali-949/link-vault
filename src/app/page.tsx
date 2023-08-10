"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import AuthForm from "./auth-form";

import { NextUIProvider } from "@nextui-org/react";

import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <div>
      <NextUIProvider>
        <AuthForm />
      </NextUIProvider>
    </div>
  );
}
