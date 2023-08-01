import { Database } from "../database.types";
import { cookies } from "next/headers";
import LinkVault from "./linkvault";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Dashboard() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div>
      <LinkVault session={session} />
    </div>
  );
}
