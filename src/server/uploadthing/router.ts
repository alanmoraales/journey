import { j } from "@server/jstack";
import {
  createUploadthing,
  createRouteHandler,
  type FileRouter,
} from "uploadthing/server";

const f = createUploadthing();

const router = {
  galleryImage: f({
    image: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("file url", file);
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
