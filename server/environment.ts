const environment = {
  database: {
    url: process.env.DATABASE_URL ?? "",
  },
  uploadThing: {
    token: process.env.UPLOADTHING_TOKEN ?? "",
    callbackUrl: process.env.UPLOADTHING_CALLBACK_URL ?? "",
  },
  imageKit: {
    url: process.env.IMAGE_KIT_URL ?? "",
  },
};

export default environment;
