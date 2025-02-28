import environmentService from "@services/environment";

interface Image {
  id: number;
  src: string;
  bucketKey: string;
  width: number;
  height: number;
  placeholderBase64: string;
  createdAt: Date;
}

const JourneyService = () => {
  const getImages = async (): Promise<Image[]> => {
    const response = await fetch(
      `${environmentService.backOffice.url}/images/list`
    );
    const images = await response.json();
    return images;
  };

  return {
    getImages,
  };
};

const journeyService = JourneyService();

export type { Image };
export default journeyService;
