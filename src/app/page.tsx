import UploadButton from "@/app/components/UploadButton";
import GallerySSR from "@/app/components/GallerySSR";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="flex min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex-col items-center justify-center relative isolate">
      <UploadButton />
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <GallerySSR />
      </Suspense>
    </main>
  );
}
