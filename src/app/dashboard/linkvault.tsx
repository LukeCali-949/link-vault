"use client";

import Navbar from "@/components/Navbar";
import { useCallback, useEffect, useState } from "react";
import { Database } from "../database.types";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

export default function LinkVault({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();

  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const user = session?.user;

  // const getProfile = useCallback(async () => {
  //     try {
  //       setLoading(true);

  //       let { data, error, status } = await supabase
  //         .from("profiles")
  //         .select(`full_name, username, avatar_url`)
  //         .eq("id", user?.id)
  //         .single();

  //       if (error && status !== 406) {
  //         throw error;
  //       }

  //       if (data) {
  //         setFullname(data.full_name);
  //         setUsername(data.username);

  //         if (data.full_name && data.username) {
  //           setSubmitted(true);
  //         }
  //         setAvatarUrl(data.avatar_url);
  //       }
  //     } catch (error) {
  //       alert("Error loading user data!");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, [user, supabase]);

  //   useEffect(() => {
  //     getProfile();
  //   }, [user, getProfile]);

  return <div></div>;
}
