import notionService from "@services/notion";
import RecentPostsSection from "@organisms/RecentPostsSection/RecentPostsSection";
import Navbar from "@organisms/Navbar";
import Flex from "@atoms/Flex";

const BlogPage = async () => {
  const posts = await notionService.getPosts();

  return (
    <Flex flexDirection="column" gap="xl" paddingY="xl">
      <Navbar />
      <main>
        <Flex flexDirection="column" gap="xl">
          <RecentPostsSection posts={posts} />
        </Flex>
      </main>
    </Flex>
  );
};

export default BlogPage;
