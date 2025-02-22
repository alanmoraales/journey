import { j } from "./jstack";
import { Hono } from "hono";
import imagesRouter from "@/server/images/router";
import uploadThingRouter from "@/server/uploadThing";

/**
 * This is your base API.
 * Here, you can handle errors, not-found responses, cors and more.
 *
 * @see https://jstack.app/docs/backend/app-router
 */
const api = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  .onError(j.defaults.errorHandler);

const uploadthing = j.router().on(["GET", "POST"], ["/"], (c) => {
  // map hono context to uploadthing context
  const request = c.req.raw;
  return uploadThingRouter(request);
});

/**
 * This is the main router for your server.
 * All routers in /server/routers should be added here manually.
 */
const appRouter = j.mergeRouters(api, {
  images: imagesRouter,
  uploadthing: uploadthing,
});

export type AppRouter = typeof appRouter;

export default appRouter;
