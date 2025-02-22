import { eq } from "drizzle-orm";
import db from "@server/database/client";
import { images } from "@server/database/schema";

const imageRepository = {
  insert: db.insert(images),
  update: db.update(images),
};

const createOne = async (image: typeof images.$inferInsert) => {
  const newImage = await imageRepository.insert.values(image);
  return newImage;
};

const updateOne = async (
  id: number,
  image: Partial<typeof images.$inferInsert>
) => {
  const updatedImage = await imageRepository.update
    .set(image)
    .where(eq(images.id, id));
  return updatedImage;
};

const imageService = {
  createOne,
  updateOne,
};

export default imageService;
