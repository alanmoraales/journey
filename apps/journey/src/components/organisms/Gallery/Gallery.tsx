"use client";

import NextImage from "next/image";
import useResizeObserver from "@repo/hooks/useResizeObserver";
import useJustifiedLayout from "@repo/hooks/useJustifiedLayout";
import type { Image } from "@server/actions/getImages";

function Gallery({ images }: { images: Image[] }) {
  const { size, ref } = useResizeObserver<HTMLDivElement>();
  const layout = useJustifiedLayout(images, size.width);

  return (
    <div
      ref={ref}
      style={{ position: "relative", height: layout.containerHeight }}
    >
      {layout.boxes.map((box, index) => {
        const image = images[index]!;
        return (
          <NextImage
            key={image.id}
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
        );
      })}
    </div>
  );
}

export default Gallery;
