import { useLogoutUser } from "@/hooks/useLogoutUser";
import { useMeQuery } from "@/hooks/useMeQuery";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export const NavBar: React.FC = () => {
  const { data } = useMeQuery();
  const logoutUser = useLogoutUser();

  let body = null;

  console.log(data);

  if (!data) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.username}</Box>
        <Button variant="link" onClick={() => logoutUser()}>
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex zIndex={2} position="sticky" top={0} bg="teal" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
