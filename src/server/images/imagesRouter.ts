import { j, publicProcedure } from "@server/jstack";
import { z } from "zod";

const imagesRouter = j.router({
  upload: publicProcedure
    .input(
      z.object({
        file: z.instanceof(File),
      })
    )
    .post(async ({ input, ctx }) => {
      const { file } = input;
      console.log(file);
    }),
});

export default imagesRouter;
