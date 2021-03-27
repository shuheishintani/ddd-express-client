import { UserForm } from "@/components/UserForm";
import { useAuth } from "@/hooks/useAuth";
import { NextPage } from "next";
import React from "react";
import NextLink from "next/link";
import { Box, Link } from "@chakra-ui/react";

interface Props {}

const Login: NextPage<Props> = () => {
  const { login, statusCode } = useAuth();
  return (
    <>
      <UserForm action="ログイン" mutation={login} statusCode={statusCode} />
      <Box mt={4}>
        <NextLink href="/register">
          <Link>新規登録はこちら</Link>
        </NextLink>
      </Box>
    </>
  );
};

export default Login;
