"use client";
import { useCallback, useEffect, useState } from "react";
import Avatar2 from "./avatar2";
import Navbar from "@/components/Navbar";
import { Database } from "../database.types";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

export default function AccountForm2({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);

  // WHERE YOU LEFT OFF: CREATE A ZUSTAND STORE FOR FULLNAME AND USERNAME
  // FOR THE DASHBOARD

  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState<boolean>(false);

  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

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

        if (data.full_name && data.username) {
          setSubmitted(true);
        }
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    fullname,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;

    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,

        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      setSubmitted(true);
      alert("Profile updated!");
    } catch (error) {
      alert("Error: Username taken");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={` `}>
      {username && fullname && submitted && <Navbar username={username} />}
      <div
        className={`${!username || !fullname || !submitted ? "pb-10" : ""}`}
      ></div>
      <div
        className={`space-y-12 bg-white mx-auto sm:w-[50%] w-[80%] py-10 px-10 rounded-lg mb-10`}
      >
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please complete all profile information. (Username and Full Name
            required to continue)
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>

              <div className="mt-2">
                <input
                  type="text"
                  name="username"
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  autoComplete="username"
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="fullName"
                  value={fullname || ""}
                  onChange={(e) => setFullname(e.target.value)}
                  id="fullName"
                  autoComplete="given-name"
                  className="mb-10 block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <Avatar2
            uid={user!.id}
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url);
              updateProfile({ fullname, username, avatar_url: url });
            }}
          />
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={() => {
              if (!fullname || !username) {
                alert("Error: Cannot submit with fields empty");
              } else {
                updateProfile({ fullname, username, avatar_url });
              }
            }}
            disabled={loading}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? "Loading ..." : "Submit"}
          </button>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
