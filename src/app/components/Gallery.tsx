"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import getImages from "@/server/images/actions/getImages";
import { images } from "@/server/database/schema";
import { useEffect, useState, useRef } from "react";
import calculateLayout from "justified-layout";

const Gallery = ({
  initialImages,
}: {
  initialImages: (typeof images.$inferSelect)[];
}) => {
  const { data: images } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
    initialData: initialImages,
  });
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
      console.log(layout.boxes);
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
              height={image.height ? Number(image.height) : undefined}
              width={image.width ? Number(image.width) : undefined}
              blurDataURL={image.placeholderBase64 ?? ""}
              placeholder={image.placeholderBase64 ? "blur" : undefined}
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
