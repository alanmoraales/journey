import Navbar from "@organisms/Navbar";
import Flex from "@atoms/Flex";
import notionService from "@services/notion";
import RecentPrintsSection from "@organisms/RecentPrintsSection/RecentPrintsSection";
import GallerySection from "@organisms/GallerySection";
// import FeaturedPrintSection from "@organisms/FeaturedPrintSection/FeaturedPrintSection";
import mixpanelService from "@services/mixpanel";

const Home = async () => {
  const prints = await notionService.getPrints();
  // const featuredPrint = await notionService.getFeaturedPrint();
  mixpanelService.trackEnterPage("Home");

  return (
    <Flex flexDirection="column" gap="xl" paddingY="xl">
      <Navbar />
      <main>
        <Flex flexDirection="column" gap="xl">
          {/**
           * Temporary disabled
           */}
          {/* <FeaturedPrintSection print={featuredPrint} /> */}
          <RecentPrintsSection prints={prints} />
          <GallerySection />
        </Flex>
      </main>
    </Flex>
  );
};

export default Home;
