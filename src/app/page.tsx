import { Suspense } from "react";
import imagesService from "@/server/images/service";
import Gallery from "@/components/Gallery";

async function Home() {
  const getImages = imagesService.getAll();

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Gallery getImages={getImages} />
      </Suspense>
    </main>
  );
}

export default Home;
