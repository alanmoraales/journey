import type { InsertImage, SelectImage } from "@/server/database/schemas/image";

interface CreateImagePayload extends Omit<InsertImage, "width" | "height"> {
  width: number;
  height: number;
}

interface Image extends Omit<SelectImage, "width" | "height"> {
  width: number;
  height: number;
}

export type { CreateImagePayload, Image };
