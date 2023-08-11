"use client";
import React, { useEffect, useState } from "react";
import { Database } from "../database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

type Links = Database["public"]["Tables"]["links"]["Row"];

export default function ImageUpload({
  uid,
  url,
  size,
  onUpload,
  mode,
}: {
  uid: string;
  url: Links["image_url"];
  size: number;
  onUpload: (url: string) => void;
  mode: string;
}) {
  const supabase = createClientComponentClient<Database>();
  const [imageUrl, setImageUrl] = useState<Links["image_url"]>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("linkimages")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setImageUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadImage: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      let { error: uploadError } = await supabase.storage
        .from("linkimages")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading link image!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="">
      {imageUrl ? (
        <img
          className="sm:w-[200px] w-[200px] sm:h-[200px] h-[100px] object-cover mb-5"
          src={imageUrl}
          alt="linkimage"
        />
      ) : (
        <img
          className="w-[200px] h-[100px] mb-5"
          alt="nolinkimage"
          src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
        />
      )}
      {mode === "view" && (
        <div style={{ width: size }}>
          <label
            className="ml-1 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            htmlFor="single"
          >
            {uploading ? "Uploading ..." : "Upload"}
          </label>
          <input
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadImage}
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
}
