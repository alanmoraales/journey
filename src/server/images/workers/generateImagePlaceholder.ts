import { Worker, Queue } from "bullmq";
import IORedis from "ioredis";
import { getPlaiceholder } from "plaiceholder";
import imageService from "@server/images/service";

interface GenerateImagePlaceholderJobData {
  id: number;
  src: string;
}

const workerName = "generateImagePlaceholder";
const connection = new IORedis({ maxRetriesPerRequest: null });

const worker = new Worker<GenerateImagePlaceholderJobData>(
  workerName,
  async (job) => {
    console.info("Generating image placeholder for", job.data.src);
    const imageSrc = `${job.data.src}?w=1000`;
    const imageBuffer = await fetch(imageSrc).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );
    const {
      base64,
      css,
      metadata: { width, height },
    } = await getPlaiceholder(imageBuffer, { size: 10 });
    await imageService.updateOne(job.data.id, {
      placeholderBase64: base64,
      placeholderCss: JSON.stringify(css),
      width: width.toString(),
      height: height.toString(),
    });
  },
  { connection }
);

worker.on("completed", (job) => {
  console.info(
    `generateImagePlaceholder Job for image ${job.data.src} has completed!`
  );
});

worker.on("failed", (job, err) => {
  console.error(
    `generateImagePlaceholder Job for image ${job?.data.src} has failed with ${err.message}`
  );
});

const queue = new Queue<GenerateImagePlaceholderJobData>(workerName, {
  connection,
});

const generateImagePlaceholderQueue = {
  add: (data: GenerateImagePlaceholderJobData) => queue.add(workerName, data),
};

export default generateImagePlaceholderQueue;
