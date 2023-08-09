import React from "react";

const LinkCard = ({
  image_url,
  description,
  key,
  url,
  title,
}: {
  url: string;
  image_url: string;
  description: string;
  key: number;
  title: string;
}) => {
  function formatUrl(url: string) {
    if (!/^https?:\/\//i.test(url)) {
      return "http://" + url;
    }
    return url;
  }

  return (
    <div
      onClick={() => {
        if (url) window.open(formatUrl(url), "_blank");
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
    </div>
  );
};

export default LinkCard;
