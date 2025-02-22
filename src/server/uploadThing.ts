import { UTApi } from "uploadthing/server";
import environment from "@server/environment";

const utApi = new UTApi({
  token: environment.uploadThing.token,
});

export default utApi;
