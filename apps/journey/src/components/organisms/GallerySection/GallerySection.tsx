import PreviewSectionTemplate from "@templates/PreviewSectionTemplate";
import type { Image } from "@services/journey";
import Gallery from "@organisms/Gallery";

const GallerySection = ({ images }: { images: Image[] }) => {
  return (
    <PreviewSectionTemplate title="Galería">
      <Gallery images={images} />
    </PreviewSectionTemplate>
  );
};

export default GallerySection;
