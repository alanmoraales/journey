import { Suspense } from "react";
import UploadButton from "@/app/components/UploadButton";
import Gallery from "@/app/components/Gallery";

export default async function Home() {
  return (
    <main className="flex min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex-col items-center justify-center relative isolate">
      <UploadButton />
      <Suspense fallback={<div>Loading...</div>}>
        <Gallery />
      </Suspense>
    </main>
  );
}
