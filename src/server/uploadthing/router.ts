import { j } from "@server/jstack";
import {
  createUploadthing,
  createRouteHandler,
  type FileRouter,
} from "uploadthing/server";
import { getPlaiceholder } from "plaiceholder";
import imagesService from "@server/images/service";
import environment from "@server/environment";

const f = createUploadthing();

const router = {
  galleryImage: f({
    image: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    const src = `${environment.imageKit.url}/${file.key}`;
    const imageBuffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );
    const {
      base64,
      css,
      metadata: { width, height },
    } = await getPlaiceholder(imageBuffer, { size: 10 });
    await imagesService.createOne({
      src,
      bucketKey: file.key,
      placeholderBase64: base64,
      placeholderCss: JSON.stringify(css),
      width: width.toString(),
      height: height.toString(),
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
