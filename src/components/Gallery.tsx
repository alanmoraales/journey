"use client";

import Image from "next/image";
import { images } from "@/server/database/schema";
import { useEffect, useState, useRef, use } from "react";
import calculateLayout from "justified-layout";

const Gallery = ({
  query,
}: {
  query: Promise<(typeof images.$inferSelect)[]>;
}) => {
  const images = use(query);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [layout, setLayout] = useState<
    {
      width: number;
      height: number;
      top: number;
      left: number;
    }[]
  >([]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <div ref={containerRef} className="w-full relative">
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
