import { Suspense } from "react";
import PreviewSectionTemplate from "@templates/PreviewSectionTemplate";
import Gallery from "@organisms/Gallery";

const GallerySection = () => {
  return (
    <PreviewSectionTemplate title="Galería">
      <Suspense>
        <Gallery />
      </Suspense>
    </PreviewSectionTemplate>
  );
};

export default GallerySection;
