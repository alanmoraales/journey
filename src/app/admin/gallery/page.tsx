import UploadButton from "@/app/components/UploadButton";
import GallerySSR from "@/app/components/GallerySSR";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main>
      <UploadButton />
      <Suspense fallback={<div>Loading...</div>}>
        <GallerySSR />
      </Suspense>
    </main>
  );
}
