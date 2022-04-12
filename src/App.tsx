
import "@fontsource/inter";
import { ChakraProvider } from "@chakra-ui/react";
import { DAppProvider } from "@usedapp/core"
import theme from "./theme";
import Header from "./components/Header";
import TransferringEthers from "./pages/transferringEthers";


export const App = () => {
  return (
    <DAppProvider config={{}}>
      <ChakraProvider theme={theme}>
        <Header />
        <TransferringEthers />
      </ChakraProvider>
    </DAppProvider>
  );
}