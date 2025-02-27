import Link from "next/link";
import { ReactNode } from "react";
import Heading from "../Heading/Heading";

interface INavbarLinkProps {
  children: ReactNode;
  href: string;
  isExternal?: boolean;
}

const NavbarLink = ({
  children,
  href,
  isExternal = false,
}: INavbarLinkProps) => (
  <Link href={href} target={isExternal ? "_blank" : "_self"}>
    <Heading
      level="h6"
      color="light"
      textDecoration="underline"
      _hover={{
        color: "primary",
      }}
    >
      {children}
    </Heading>
  </Link>
);

export default NavbarLink;
