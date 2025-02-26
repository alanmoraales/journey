import UploadButton from "@/components/UploadButton";
import GallerySSR from "@/components/GallerySSR";

export default async function Home() {
  return (
    <main>
      <UploadButton />
      <GallerySSR />
    </main>
  );
}
