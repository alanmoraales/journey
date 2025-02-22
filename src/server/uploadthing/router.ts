import { j } from "@server/jstack";
import {
  createUploadthing,
  createRouteHandler,
  type FileRouter,
} from "uploadthing/server";
import imagesService from "@server/images/service";
import generateImagePlaceholderQueue from "@server/images/workers/generateImagePlaceholder";

const f = createUploadthing();

const router = {
  galleryImage: f({
    image: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    const image = await imagesService.createOne({
      src: `https://ik.imagekit.io/alanmoraales/${file.key}`,
      bucketKey: file.key,
    });
    generateImagePlaceholderQueue.add({
      id: image.id,
      src: image.src,
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
