"use client";

import { generateUploadButton } from "@uploadthing/react";
import { useQueryClient } from "@tanstack/react-query";

const UploadButton = generateUploadButton();

export default function Home() {
  const queryClient = useQueryClient();

  return (
    <UploadButton
      endpoint="galleryImage"
      onClientUploadComplete={(res) => {
        queryClient.refetchQueries({ queryKey: ["images"] });
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}
