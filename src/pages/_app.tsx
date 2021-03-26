import { Layout } from "@/components/Layout";
import { UserViewModel } from "@/fragments/UserViewModel";
import {
  ChakraProvider,
  ColorModeProvider,
  extendTheme,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import React, { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(
  {} as {
    user: UserViewModel | null;
    setUser: React.Dispatch<React.SetStateAction<UserViewModel | null>>;
  }
);

const theme = extendTheme({
  components: {
    Button: { baseStyle: { _focus: { boxShadow: "none" } } },
  },
  initialColorMode: "light",
  useSystemColorMode: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserViewModel | null>(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <AuthContext.Provider value={providerValue}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthContext.Provider>
        </ColorModeProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
