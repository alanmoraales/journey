import { asc } from "drizzle-orm";
import db from "@/server/database/client";
import { images } from "@/server/database/schema";
import type { CreateImagePayload, Image } from "@/server/images/types";

async function createOne(image: CreateImagePayload) {
  const { width, height, ...restOfImage } = image;
  const newImage = await db
    .insert(images)
    .values({
      ...restOfImage,
      width: width.toString(),
      height: height.toString(),
    })
    .returning();
  return newImage[0]!;
}

async function getAll(): Promise<Image[]> {
  const allImages = await db.select().from(images).orderBy(asc(images.id));
  return allImages.map((image) => ({
    ...image,
    width: Number(image.width),
    height: Number(image.height),
  }));
}

const imageService = {
  createOne,
  getAll,
};

export default imageService;
