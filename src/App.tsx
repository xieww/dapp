import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import "@fontsource/inter";
import Layout from "./Layout";
import ConnectButton from "./components/ConnectButton";
import ModalAccount from "./components/ModalAccount";

export const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <ConnectButton handleOpenModal={onOpen} />
        <ModalAccount isOpen={isOpen} onClose={onClose} />
      </Layout>
    </ChakraProvider>
  );
}
