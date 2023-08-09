"use client";

import { useState, useCallback, useEffect } from "react";
import { Database } from "../database.types";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import ImageUpload from "./image-upload";

type Link = {
  url: string;
  image_url: string;
  description: string;
};

//https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg

export default function LinkCards({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();

  const user = session?.user;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [image_url, setImageUrl] = useState<string | null>(null);

  const [links, setLinks] = useState<Link[]>([]);

  const getLinks = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error } = await supabase
        .from("links")
        .select("url, image_url, description")
        .eq("user_id", user?.id);

      if (error) {
        throw error;
      }

      if (data) {
        const filteredData: Link[] = data.map((link: any) => ({
          url: link.url,
          image_url: link.image_url,
          description: link.description,
        }));

        setLinks(filteredData);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  const closeModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
      setDescription("");
      setUrl("");
      setImageUrl(null);
    }
  };

  async function updateLinks({
    description,
    url,
    image_url,
  }: {
    description: string | null;
    url: string | null;

    image_url: string | null;
  }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("links").insert({
        user_id: user?.id as string,
        url,
        description,

        image_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      //alert("Links updated!");
    } catch (error) {
      alert("Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ml-12">
      <div
        onClick={() => {
          console.log("done");
          setShowModal(true);
        }}
        className="w-[170px] h-[250px] bg-white flex flex-col rounded-lg border-4 shadow-xl hover:border-black hover:cursor-pointer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/256px-Plus_symbol.svg.png"
          alt="Shoes"
        />
        <h2 className="card-title mx-auto">Add Link</h2>
      </div>

      {showModal && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <form
            className="bg-white p-10 rounded-lg mx-auto w-full sm:w-3/4 lg:w-1/2 space-y-8"
            // onSubmit={magicLinkLogin}
          >
            <h2 className="text-lg font-semibold leading-7 text-gray-900">
              Link Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Please complete all link information
            </p>

            <div className="mt-5">
              <label
                htmlFor="url"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                URL
              </label>
              <div className="mt-2">
                <input
                  id="url"
                  name="url"
                  value={url || ""}
                  onChange={(e) => setUrl(e.target.value)}
                  type="url"
                  autoComplete="url"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  id="description"
                  name="description"
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                  type="description"
                  autoComplete="description"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <ImageUpload
              uid={user!.id}
              url={image_url}
              size={150}
              onUpload={(url) => {
                setImageUrl(url);
                //updateLinks({ description, url, image_url });
              }}
            />

            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                className="text-sm font-semibold text-gray-700"
                onClick={() => {
                  //   eraseForm();
                  setDescription("");
                  setUrl("");
                  setImageUrl(null);
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!url || !description) {
                    alert("Error: Cannot submit with fields empty");
                  } else {
                    updateLinks({ url, description, image_url });
                  }
                }}
                disabled={loading}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Loading ..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
