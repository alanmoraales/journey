"use client";

import Image from "next/image";
import { images } from "@/server/database/schema";
import { useEffect, useState, use } from "react";
import calculateLayout from "justified-layout";
import { useResizeObserver } from "@/hooks/useResizeObserver";

const Gallery = ({
  query,
}: {
  query: Promise<(typeof images.$inferSelect)[]>;
}) => {
  const images = use(query);
  const { size, ref } = useResizeObserver<HTMLDivElement>();
  const [layout, setLayout] = useState<
    {
      width: number;
      height: number;
      top: number;
      left: number;
    }[]
  >([]);

  useEffect(() => {
    if (Boolean(size.width) && images) {
      const layout = calculateLayout(
        images.map((image) => ({
          width: Number(image.width),
          height: Number(image.height),
        })),
        {
          containerWidth: size.width,
        }
      );
      setLayout(layout.boxes);
    }
  }, [images, size]);

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
