import {
  createUploadthing,
  createRouteHandler,
  type FileRouter,
  UploadThingError,
} from "uploadthing/server";

const f = createUploadthing();

const uploadThingRouter = {
  galleryImage: f({
    image: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    // This code RUNS ON YOUR SERVER after upload
    console.log("file url", file);
    // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    return { url: file.ufsUrl };
  }),
} satisfies FileRouter;

const routeHandler = createRouteHandler({
  router: uploadThingRouter,
});

export default routeHandler;
