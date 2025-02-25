"use server";

import imageService from "../service";

const getImages = async () => {
  const images = await imageService.getAll();
  return images;
};

export default getImages;
