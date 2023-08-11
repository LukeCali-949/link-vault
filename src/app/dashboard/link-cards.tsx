"use client";

import { useState, useCallback, useEffect } from "react";
import { Database } from "../database.types";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import ImageUpload from "./image-upload";
import LinkCard from "./link-card";
import { Tabs, Tab } from "@nextui-org/react";

type Link = {
  title: string;
  url: string;
  image_url: string;
  description: string;
  id: number;
  key: number;
};

//https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg

export default function LinkCards({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();

  const user = session?.user;

  const [mode, setMode] = useState<string>("view");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [image_url, setImageUrl] = useState<string | null>(null);

  const [currentId, setCurrentId] = useState<number | null>(null);

  const [links, setLinks] = useState<Link[]>([]);

  async function downloadImageFromPath(path: string | null): Promise<string> {
    if (!path) {
      return "";
    }

    try {
      const { data, error } = await supabase.storage
        .from("linkimages")
        .download(path);
      if (error) {
        throw error;
      }

      return URL.createObjectURL(data);
    } catch (error) {
      console.error("Error downloading image: ", error);
      return ""; // or return a default/fallback image URL if you have one
    }
  }

  const deleteLink = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("links")
        .delete()
        .eq("id", id); // assuming "id" is the column name for the primary key

      if (error) {
        throw error;
      }

      if (data) {
        //setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
        //alert("Link deleted successfully!");
      }
    } catch (error) {
      //alert(error);
    }
  };

  const getLinks = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error } = await supabase
        .from("links")
        .select("url, image_url, description, title, id")
        .eq("user_id", user?.id);

      if (error) {
        throw error;
      }

      if (data) {
        const blobUrls = await Promise.all(
          data.map((link) => downloadImageFromPath(link.image_url))
        );

        const filteredData: Link[] = data.map((link: any, index: number) => ({
          url: link.url,
          title: link.title,
          image_url: blobUrls[index],
          description: link.description,
          id: link.id,
          key: link.id,
        }));

        setLinks(filteredData);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getLinks();
  }, []);

  const closeModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
      setDescription("");
      setUrl("");
      setImageUrl(null);
      setTitle("");
    }
  };

  async function updateLinks({
    description,
    url,
    image_url,
    title,
  }: {
    description: string | null;
    url: string | null;
    image_url: string | null;
    title: string | null;
  }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("links").insert({
        user_id: user?.id as string,
        url,
        description,
        title,
        image_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      getLinks();
      //alert("Links updated!");
    } catch (error) {
      alert("Error");
    } finally {
      setLoading(false);
    }
  }

  const tabs = ["View", "Edit"];

  return (
    <div className="mt-[50px] sm:mt-0">
      <div className="flex flex-wrap sm:gap-x-10 gap-x-5 gap-y-7 sm:mx-[200px] mx-[40px]">
        {mode === "view" && (
          <div
            onClick={() => {
              setShowModal(true);
            }}
            className="sm:w-[170px] w-[85px]  sm:h-[250px] h-[125px] mr-[0px] bg-gray-300 flex flex-col rounded-lg border-4 shadow-xl hover:border-black hover:cursor-pointer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/256px-Plus_symbol.svg.png"
              alt="Shoes"
            />
            <h2 className="card-title mx-auto text-sm sm:text-lg">Add Link</h2>
          </div>
        )}
        {links.map((linkObject) => (
          <LinkCard
            id={linkObject.id}
            setShowModal={setShowModal}
            title={linkObject.title}
            url={linkObject.url}
            image_url={linkObject.image_url}
            description={linkObject.description}
            key={linkObject.key}
            mode={mode}
            session={session}
            setUrl={setUrl}
            setDescription={setDescription}
            setTitle={setTitle}
            setImageUrl={setImageUrl}
            setCurrentId={setCurrentId}
          />
        ))}
      </div>
      <Tabs
        className="absolute sm:top-2 top-[77px] left-6"
        onSelectionChange={(index: any) => {
          // Do something when the selected tab changes
          setMode(tabs[index].toLowerCase());
          // console.log(`Selected tab: ${tabs[index]}`);
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} title={tab} />
        ))}
      </Tabs>

      {showModal && (
        <div
          onClick={closeModal}
          className="fixed overflow-y-auto inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div
            className="bg-white h-[80%] sm:h-[75%] p-10 rounded-lg mx-auto w-[90%] sm:w-3/4 lg:w-1/2 sm:space-y-8 space-y-6"
            // onSubmit={magicLinkLogin}
          >
            <div>
              <h2 className="text-lg font-semibold leading-7 text-gray-900">
                Link Information
              </h2>
              <p className="mt-5 text-sm leading-6 text-gray-600">
                {mode === "view" ? "Please complete all link information" : ""}
              </p>
            </div>

            <div className="mt-5">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                {mode === "view" ? (
                  <input
                    id="title"
                    name="title"
                    value={title || ""}
                    onChange={(e) => setTitle(e.target.value)}
                    type="title"
                    autoComplete="title"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                ) : (
                  <input
                    id="title"
                    name="title"
                    value={title || ""}
                    readOnly
                    type="title"
                    autoComplete="title"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                )}
              </div>
            </div>
            <div className="mt-5">
              <label
                htmlFor="url"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                URL
              </label>
              <div className="mt-2">
                {mode === "view" ? (
                  <input
                    id="url"
                    name="url"
                    value={url || ""}
                    onChange={(e) => setUrl(e.target.value)}
                    type="url"
                    autoComplete="url"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                ) : (
                  <input
                    id="url"
                    name="url"
                    value={url || ""}
                    readOnly
                    type="url"
                    autoComplete="url"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                )}
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
                {mode === "view" ? (
                  <input
                    id="description"
                    name="description"
                    value={description || ""}
                    onChange={(e) => setDescription(e.target.value)}
                    type="description"
                    autoComplete="description"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                ) : (
                  <input
                    id="description"
                    name="description"
                    value={description || ""}
                    readOnly
                    type="description"
                    autoComplete="description"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                )}
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
              mode={mode}
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
                  setTitle("");
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  if (mode === "view") {
                    if (!url || !title) {
                      alert(
                        "Error: Cannot submit with url or tile fields empty"
                      );
                    } else {
                      updateLinks({ url, description, image_url, title });
                      setDescription("");
                      setUrl("");
                      setImageUrl(null);
                      setTitle("");
                      setShowModal(false);
                    }
                  } else {
                    if (currentId) {
                      deleteLink(currentId);
                      const newLinks = links.filter(
                        (link) => link.id !== currentId
                      ); // Remove the deleted link from the state without fetching
                      setLinks(newLinks);
                      setShowModal(false);
                    }
                  }
                }}
                disabled={loading}
                className={`rounded-md ${
                  mode === "view"
                    ? "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                    : "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
                } px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
              >
                {loading
                  ? "Loading ..."
                  : `${mode === "view" ? "Submit" : "Delete"}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
