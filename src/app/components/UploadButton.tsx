"use client";

import { generateUploadButton } from "@uploadthing/react";
import { useRouter } from "next/navigation";
const UploadButton = generateUploadButton();

export default function Home() {
  const router = useRouter();

  return (
    <UploadButton
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
