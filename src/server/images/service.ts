import { eq } from "drizzle-orm";
import db from "@server/database/client";
import { images } from "@server/database/schema";

const createOne = async (image: typeof images.$inferInsert) => {
  const newImage = await db.insert(images).values(image).returning();
  return newImage[0]!;
};

const updateOne = async (
  id: number,
  image: Partial<typeof images.$inferInsert>
) => {
  const updatedImage = await db
    .update(images)
    .set(image)
    .where(eq(images.id, id))
    .returning();
  return updatedImage[0]!;
};

const imageService = {
  createOne,
  updateOne,
};

export default imageService;
