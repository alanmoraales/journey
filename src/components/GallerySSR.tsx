import getImages from "@/server/images/actions/getImages";
import Gallery from "@/components/Gallery";
import { Suspense } from "react";

const GallerySSR = () => {
  const getImagesPromise = getImages();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Gallery query={getImagesPromise} />
    </Suspense>
  );
};

export default GallerySSR;
