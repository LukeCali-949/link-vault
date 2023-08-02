"use client";

import { useState } from "react";

//https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg

export default function LinkCards() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [url, setUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const closeModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

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
            {avatar_url || (
              <img src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"></img>
            )}

            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                className="text-sm font-semibold text-gray-700"
                onClick={() => {
                  //   eraseForm();
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
