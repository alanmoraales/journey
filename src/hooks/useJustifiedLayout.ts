import { useEffect, useState } from "react";
import calculateLayout from "justified-layout";

interface Box {
  width: number;
  height: number;
  top: number;
  left: number;
}

interface ImageDimensions {
  width: number;
  height: number;
}

function useJustifiedLayout(
  images: ImageDimensions[],
  containerWidth: number
): Box[] {
  const [layout, setLayout] = useState<Box[]>([]);

  useEffect(() => {
    if (containerWidth && images.length > 0) {
      const calculatedLayout = calculateLayout(images, {
        containerWidth,
      });
      setLayout(calculatedLayout.boxes);
    }
  }, [images, containerWidth]);

  return layout;
}

export default useJustifiedLayout;
