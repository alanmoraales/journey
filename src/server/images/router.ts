import { j, publicProcedure } from "@server/jstack";
import utApi from "@server/uploadThing";
import { z } from "zod";

const imagesRouter = j.router({
  upload: publicProcedure
    .input(z.instanceof(FormData))
    .post(async ({ c, input }) => {
      const file = input.get("file");
      console.log(file);
      // const response = await utApi.uploadFiles(file);
      //return response;
      return c.json({
        message: "File uploaded",
      });
    }),
});

export default imagesRouter;
