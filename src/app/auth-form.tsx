"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./database.types";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  return (
    <div className="flex flex-col gap-5">
      <div className="mx-auto sm:w-[30%] w-[80%] h-[500px] bg-gray-900 p-5 rounded-lg">
        <h1 className="text-white">Welcome to LinkVault!</h1>
      </div>

      <div className="mx-auto sm:w-[30%] w-[80%] bg-gray-900 p-5 rounded-lg">
        <Auth
          supabaseClient={supabase}
          view="magic_link"
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          showLinks={false}
          providers={["google"]}
          redirectTo="http://localhost:3000/auth/callback"
        />
      </div>
    </div>
  );
}
