import { UserForm } from "@/components/UserForm";
import { useAuth } from "@/hooks/useAuth";
import { Box, Link } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import NextLink from "next/link";

interface Props {}

const Register: NextPage<Props> = () => {
  const { register, statusCode } = useAuth();
  return (
    <>
      <UserForm action="新規登録" mutation={register} statusCode={statusCode} />
      <Box mt={4}>
        <NextLink href="/login">
          <Link>ログインはこちら</Link>
        </NextLink>
      </Box>
    </>
  );
};

export default Register;
