"use client";

import Image from "next/image";
import { images } from "@/server/database/schema";
import { use } from "react";
import useResizeObserver from "@/hooks/useResizeObserver";
import useJustifiedLayout from "@/hooks/useJustifiedLayout";

const Gallery = ({
  query,
}: {
  query: Promise<(typeof images.$inferSelect)[]>;
}) => {
  const images = use(query);
  const { size, ref } = useResizeObserver<HTMLDivElement>();
  const imageDimensions = images.map((image) => ({
    width: Number(image.width),
    height: Number(image.height),
  }));
  const layout = useJustifiedLayout(imageDimensions, size.width);

  return (
    <div ref={ref} className="w-full relative">
      {layout.map((box, index) => {
        const image = images[index]!;
        return (
          <div key={image.id}>
            <Image
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
};

export default Gallery;
