"use server";

import imageService from "../service";

const getImages = () => {
  return imageService.getAll();
};

export default getImages;
