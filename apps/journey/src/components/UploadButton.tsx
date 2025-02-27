"use client";

import { generateUploadButton } from "@uploadthing/react";
import { useRouter } from "next/navigation";

const TUploadButton = generateUploadButton();

function UploadButton() {
  const router = useRouter();

  return (
    <TUploadButton
      endpoint="galleryImage"
      onClientUploadComplete={(res) => {
        router.refresh();
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}

export default UploadButton;
