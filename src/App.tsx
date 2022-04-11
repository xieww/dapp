
import * as React from "react"
import "@fontsource/inter";
import ConnectButton from "./components/ConnectButton";
import ModalAccount from "./components/ModalAccount";
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  useDisclosure
} from "@chakra-ui/react";
import { DAppProvider } from "@usedapp/core"
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import theme from "./theme";


export const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DAppProvider config={{}}>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              <Logo h="40vmin" pointerEvents="none" />
              <ConnectButton handleOpenModal={onOpen} />
              <ModalAccount isOpen={isOpen} onClose={onClose} />
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>

    </DAppProvider>
  );
}