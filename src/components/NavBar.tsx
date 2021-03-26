import { useAuth } from "@/hooks/useAuth";
import { wait } from "@/utils/wait";
import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const NavBar: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = async () => {
    onOpen();
    await logout();
    onClose();
  };

  return (
    <Flex zIndex={2} position="sticky" top={0} bg="teal" p={4}>
      <NextLink href="/">
        <Link fontSize="lg" color="white">
          Chakra Todo
        </Link>
      </NextLink>
      <Box ml={"auto"}>
        {user ? (
          <Flex>
            <Text color="white" mr={4}>
              {user.username}
            </Text>
            <Link color="white" onClick={handleLogout}>
              ログアウト
            </Link>
          </Flex>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <Flex>
            <NextLink href="/login">
              <Link fontSize="md" color="white" mr={4}>
                ログイン
              </Link>
            </NextLink>
            <NextLink href="/register">
              <Link fontSize="md" color="white">
                新規登録
              </Link>
            </NextLink>
          </Flex>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Flex align="center" justify="center">
          <Spinner mx="auto" />
        </Flex>
      </Modal>
    </Flex>
  );
};
