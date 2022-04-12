import {
  Spacer,
  Box,
  Flex,
  useDisclosure,
  HStack
} from "@chakra-ui/react";
import ConnectButton from "../ConnectButton";
import ModalAccount from "../ModalAccount";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex width="90%" margin="auto" p="4" minWidth="500px">
      <Spacer />
      <HStack>
        <Box>
          <ConnectButton handleOpenModal={onOpen} />
          {isOpen && <ModalAccount isOpen={isOpen} onClose={onClose} />}
        </Box>
        <Box>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Box>
      </HStack>
    </Flex>
  );
}

export default Header;
