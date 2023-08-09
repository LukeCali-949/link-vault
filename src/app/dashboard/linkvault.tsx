"use client";

import Navbar from "@/components/Navbar";
import { useCallback, useEffect, useState } from "react";
import { Database } from "../database.types";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import LinkCards from "./link-cards";

export default function LinkVault({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();

  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  return (
    <div>
      <Navbar username={username} />
      <LinkCards session={session} />
    </div>
  );
}
