import Image from "next/image";
import getImages from "@/server/images/actions/getImages";

const Gallery = async () => {
  const images = await getImages();

  return (
    <div className="grid grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.id}>
          <Image
            src={image.src}
            alt={image.src}
            height={Number(image.height)}
            width={Number(image.width)}
            blurDataURL={image.placeholderBase64 ?? ""}
            placeholder="blur"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
