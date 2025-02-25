"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import getImages from "@/server/images/actions/getImages";

const Gallery = () => {
  const { data: images } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
  });

  return (
    <div className="grid grid-cols-4 gap-4">
      {images?.map((image) => (
        <div key={image.id}>
          <Image
            src={image.src}
            alt={image.src}
            height={image.height ? Number(image.height) : undefined}
            width={image.width ? Number(image.width) : undefined}
            blurDataURL={image.placeholderBase64 ?? ""}
            placeholder={image.placeholderBase64 ? "blur" : undefined}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
