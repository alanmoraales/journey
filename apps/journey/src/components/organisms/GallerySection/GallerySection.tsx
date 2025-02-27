import PreviewSectionTemplate from "@templates/PreviewSectionTemplate";
import { Image } from "@server/actions/getImages";
import Gallery from "@organisms/Gallery";

const GallerySection = ({ images }: { images: Image[] }) => {
  return (
    <PreviewSectionTemplate title="Galería">
      <Gallery images={images} />
    </PreviewSectionTemplate>
  );
};

export default GallerySection;
