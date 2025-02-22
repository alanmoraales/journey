import { j } from "@server/jstack";
import {
  createUploadthing,
  createRouteHandler,
  type FileRouter,
} from "uploadthing/server";
import imagesService from "@server/images/service";

const f = createUploadthing();

const router = {
  galleryImage: f({
    image: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    await imagesService.createOne({
      src: file.ufsUrl,
      relativeSrc: `/${file.key}`,
      bucketKey: file.key,
    });
  }),
} satisfies FileRouter;

const routeHandler = createRouteHandler({
  router: router,
});

const uploadthingRouter = j.router().on(["GET", "POST"], ["/"], (c) => {
  // map hono context to uploadthing context
  const request = c.req.raw;
  return routeHandler(request);
});

export default uploadthingRouter;
