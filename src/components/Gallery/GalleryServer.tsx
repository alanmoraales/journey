import { Suspense } from "react";
import imagesService from "@/server/images/service";
import GalleryClient from "./GalleryClient";

async function GalleryServer() {
  const images = await imagesService.getAll();

  return (
    <Suspense>
      <GalleryClient images={images} />
    </Suspense>
  );
}

export default GalleryServer;
