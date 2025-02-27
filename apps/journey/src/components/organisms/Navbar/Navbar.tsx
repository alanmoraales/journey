import Link from "next/link";
import Heading from "@atoms/Heading";
import Grid from "@atoms/Grid";
import Flex from "@atoms/Flex";
import PageLimitContainer from "@atoms/PageLimitContainer";
import { NavbarLogo, NavbarLink } from "@atoms/Navbar";
import environmentService from "@services/environment";

const Navbar = () => {
  return (
    <PageLimitContainer>
      <Grid
        gap="md"
        gridTemplateColumns={{
          base: "1fr",
          sm: "auto 1fr",
        }}
        alignItems="end"
      >
        <Link href="/">
          <Flex gap="md" alignItems="center">
            <NavbarLogo />
            <Heading>The Photography Journey</Heading>
          </Flex>
        </Link>
        <Flex
          gap="lg"
          alignItems="center"
          flexWrap="wrap"
          justifySelf={{
            base: "flex-start",
            sm: "flex-end",
          }}
          paddingLeft={{
            base: "41px",
            sm: "0",
          }}
        >
          <NavbarLink href="/blog">Blog</NavbarLink>
          <NavbarLink href={environmentService.store.url} isExternal>
            Wallpapers
          </NavbarLink>
        </Flex>
      </Grid>
    </PageLimitContainer>
  );
};

export default Navbar;
