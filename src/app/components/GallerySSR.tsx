import getImages from "@/server/images/actions/getImages";
import Gallery from "./Gallery";

const GallerySSR = async () => {
  const images = await getImages();
  return <Gallery initialImages={images} />;
};

export default GallerySSR;
