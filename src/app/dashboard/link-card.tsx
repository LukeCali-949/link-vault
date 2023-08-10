import React, { useState } from "react";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "../database.types";
import ImageUpload from "./image-upload";

const LinkCard = ({
  id,
  image_url,
  description,
  key,
  url,
  title,
  mode,
  session,
  setShowModal,
  setUrl,
  setDescription,
  setTitle,
  setImageUrl,
  setCurrentId,
}: {
  id: number;
  url: string;
  image_url: string;
  description: string;
  key: number;
  title: string;
  mode: string;
  session: Session | null;
  setUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setDescription: React.Dispatch<React.SetStateAction<string | null>>;
  setTitle: React.Dispatch<React.SetStateAction<string | null>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const supabase = createClientComponentClient<Database>();

  const user = session?.user;

  //const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const closeModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  function formatUrl(url: string) {
    if (!/^https?:\/\//i.test(url)) {
      return "http://" + url;
    }
    return url;
  }

  return (
    <div
      onClick={() => {
        if (mode === "view") {
          if (url) window.open(formatUrl(url), "_blank");
        } else {
          setDescription(description);
          setImageUrl(image_url);
          setTitle(title);
          setUrl(url);
          setCurrentId(id);
          setShowModal(true);
        }
      }}
      key={key}
      className="overflow-hidden w-[170px] h-[250px] bg-white flex flex-col rounded-lg border-4 shadow-xl hover:border-black hover:cursor-pointer"
    >
      <img
        src={
          image_url ||
          "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
        }
        alt="linkimage"
        className={`mt-5 h-[100px] w-[${image_url ? 200 : 200}px] mx-auto`}
      />
      <h2 className="card-title mx-auto mt-10">{title}</h2>

      {/* {showModal && (
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
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  value={title || ""}
                  readOnly
                  //onChange={(e) => setTitle(e.target.value)}
                  type="title"
                  autoComplete="title"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
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
                <input
                  id="url"
                  name="url"
                  value={url || ""}
                  readOnly
                  //onChange={(e) => setUrl(e.target.value)}
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
                  readOnly
                  id="description"
                  name="description"
                  value={description || ""}
                  //onChange={(e) => setDescription(e.target.value)}
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
                //setImageUrl(url);
                //updateLinks({ description, url, image_url });
              }}
            />

            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                className="text-sm font-semibold text-gray-700"
                onClick={() => {
                  //   eraseForm();
                  // setDescription("");
                  // setUrl("");
                  // setImageUrl(null);
                  // setTitle("");
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  //ADD DELETE HERE LATER
                }}
                disabled={loading}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Loading ..." : "Delete"}
              </button>
            </div>
          </form>
        </div>
      )} */}
    </div>
  );
};

export default LinkCard;
