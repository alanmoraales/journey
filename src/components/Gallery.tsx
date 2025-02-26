"use client";

import { use } from "react";
import NextImage from "next/image";
import useResizeObserver from "@/hooks/useResizeObserver";
import useJustifiedLayout from "@/hooks/useJustifiedLayout";
import type { Image } from "@/server/images/types";

function Gallery({ getImages }: { getImages: Promise<Image[]> }) {
  const images = use(getImages);
  const { size, ref } = useResizeObserver<HTMLDivElement>();
  const layout = useJustifiedLayout(images, size.width);

  return (
    <div ref={ref} className="w-full relative">
      {layout.map((box, index) => {
        const image = images[index]!;
        return (
          <div key={image.id}>
            <NextImage
              src={image.src}
              alt={image.src}
              height={Number(image.height)}
              width={Number(image.width)}
              blurDataURL={image.placeholderBase64}
              placeholder="blur"
              style={{
                position: "absolute",
                top: box.top,
                left: box.left,
                width: box.width,
                height: box.height,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Gallery;
