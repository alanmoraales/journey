import { j } from "@/server/jstack";
import {
  createUploadthing,
  createRouteHandler,
  type FileRouter,
} from "uploadthing/server";
import { getPlaiceholder } from "plaiceholder";
import imagesService from "@/server/images/service";
import environment from "@/server/environment";

const f = createUploadthing();

const router = {
  galleryImage: f({
    image: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    const src = `${environment.imageKit.url}/${file.key}`;
    const srcToGeneratePlaceholder = `${src}?tr=w-10`;
    const srcToGenerateDimensions = `${src}?tr=w-3000`;
    const imageBuffer = await fetch(srcToGeneratePlaceholder).then(
      async (res) => Buffer.from(await res.arrayBuffer())
    );
    const dimensionsImageBuffer = await fetch(srcToGenerateDimensions).then(
      async (res) => Buffer.from(await res.arrayBuffer())
    );
    const { base64 } = await getPlaiceholder(imageBuffer, { size: 10 });
    const {
      metadata: { width, height },
    } = await getPlaiceholder(dimensionsImageBuffer, { size: 10 });
    await imagesService.createOne({
      src,
      bucketKey: file.key,
      placeholderBase64: base64,
      width: width,
      height: height,
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
