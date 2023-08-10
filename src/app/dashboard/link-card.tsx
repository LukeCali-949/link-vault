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
    <div className="relative">
      {mode === "edit" && (
        <img
          src="/infoicon.svg"
          alt="My Icon"
          className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[20px]"
        />
      )}

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
        className="overflow-hidden sm:w-[170px] w-[85px] sm:h-[250px] h-[125px] bg-white flex flex-col rounded-lg border-4 shadow-xl hover:border-black hover:cursor-pointer"
      >
        <img
          src={
            image_url ||
            "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
          }
          alt="linkimage"
          className={`mt-5 sm:h-[100px] sm:w-[200px] h-[50px] w-[100px] mx-auto`}
        />
        <h2 className="card-title mx-auto sm:mt-10 mt-2 text-xs sm:text-lg">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default LinkCard;
