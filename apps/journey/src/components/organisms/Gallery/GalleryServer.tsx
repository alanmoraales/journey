import getImages from "@server/actions/getImages";
import GalleryClient from "./GalleryClient";

async function GalleryServer() {
  const images = await getImages();

  return <GalleryClient images={images} />;
}

export default GalleryServer;
