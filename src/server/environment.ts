const environment = {
  database: {
    url: process.env.DATABASE_URL ?? "",
  },
  uploadThing: {
    token: process.env.UPLOADTHING_TOKEN ?? "",
  },
};

export default environment;
