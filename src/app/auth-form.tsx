"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./database.types";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : "";

  return (
    <div className="flex flex-col gap-5 ">
      <div className="mx-auto sm:w-[30%] w-[80%] h-[400px] bg-gray-900 p-5 rounded-lg  mt-5">
        <div className="flex flex-col gap-10">
          <div className="flex gap-5">
            <img src="/logoicon.png" />
            <h1 className="text-white my-auto sm:text-5xl text-4xl">
              LinkVault
            </h1>
          </div>
          <p className="text-white">
            Discover LinkVault - the simple way to store and organize your
            favorite website links. Easily save web pages with your own notes,
            then view them side by side for quick access. Whether you&apos;re
            researching or just browsing, LinkVault makes it better. Sign up
            today and organize your web world!
          </p>
        </div>
      </div>

      <div className="mx-auto sm:w-[30%] w-[80%] bg-gray-900 p-5 rounded-lg">
        <Auth
          supabaseClient={supabase}
          view="magic_link"
          //appearance={{ theme: ThemeSupa }}
          //theme="dark"
          showLinks={false}
          providers={["google"]}
          redirectTo={redirectTo}
          appearance={{
            style: {
              button: { background: "darkgray", color: "white" },
              anchor: { color: "blue" },
              message: { color: "white" },
              input: { color: "white" },
              //..
            },
          }}
        />
      </div>
    </div>
  );
}
