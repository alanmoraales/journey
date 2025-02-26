"use server";

import imageService from "@/server/images/service";

const getImages = () => {
  return imageService.getAll();
};

export default getImages;
