"use client";

import { generateUploadButton } from "@uploadthing/react";

const UploadButton = generateUploadButton();

export default function Home() {
  return (
    <UploadButton
      endpoint="galleryImage"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
