import { useEffect, useState } from "react";
import calculateLayout from "justified-layout";

interface Box {
  width: number;
  height: number;
  top: number;
  left: number;
  aspectRatio: number;
}

interface ImageDimensions {
  width: number;
  height: number;
}

type JustifiedLayoutResult = {
  boxes: Box[];
  containerHeight: number;
};

function useJustifiedLayout(
  images: ImageDimensions[],
  containerWidth: number
): JustifiedLayoutResult {
  const [layout, setLayout] = useState<JustifiedLayoutResult>({
    boxes: [],
    containerHeight: 0,
  });

  useEffect(() => {
    if (containerWidth && images.length > 0) {
      const calculatedLayout = calculateLayout(images, {
        containerWidth,
        containerPadding: 0,
      });
      setLayout(calculatedLayout);
    }
  }, [images, containerWidth]);

  return layout;
}

export default useJustifiedLayout;
