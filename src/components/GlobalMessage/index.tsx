import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, Center, Container, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import React from "react";

type GlobalMessageProps = {
  message?: string;
  status?: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

const GlobalMessage: React.FC<GlobalMessageProps> = ({ isOpen, title, onClose }) => {
  const cancelRef: any = React.useRef()

  return (
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogBody>
          <Container centerContent>
            <Flex height="160px" justifyContent="center" alignItems="center">
              <Spinner color='red.500' size='xl' />
            </Flex>
          </Container>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default GlobalMessage;