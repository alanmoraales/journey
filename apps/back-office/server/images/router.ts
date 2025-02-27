import { j, publicProcedure } from "@/server/jstack";
import imagesService from "./service";

const imagesRouter = j.router({
  list: publicProcedure.query(async ({ c }) => {
    const images = await imagesService.getAll();
    return c.json(images);
  }),
});

export default imagesRouter;
