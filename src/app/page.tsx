"use client";

import { useEffect } from "react";
import supabase from "@/lib/supabaseClient";
import { useRouter } from 'next/navigation'

export default function Home() {
  let userProfile;

  useEffect(() => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.auth.getSession();

    userProfile = user;
    console.log("SPACE");
    console.log(data);
  }, [])


  return (
    {userProfile === null ? (<h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>) : }
    
  );
}
