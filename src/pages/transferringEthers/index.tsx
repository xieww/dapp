import { Box, Button, Center, Flex, FormControl, Input, InputGroup, NumberInput, NumberInputField, useMediaQuery, useToast } from "@chakra-ui/react";
import { useEtherBalance, useEthers, useSendTransaction } from "@usedapp/core";
import { utils } from "ethers";
import { useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";

const STATUS_CONFIG: any = {
  "Success": 'success',
  "Exception": 'error',
};


const TransferringEthers: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [receipent, setReceipent] = useState<string>('');
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTablet] = useMediaQuery("(min-width: 750px)");
  const [isMobile] = useMediaQuery("(min-width: 320px)");
  const { sendTransaction, state } = useSendTransaction();
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const toast = useToast();
  const [buttonText,setButtonText] = useState<string>('转移');

  const handleAmountInputChange = (e: any) => {
    setAmount(e?.target?.value);
  }

  const handlesetReceipentInputChange = (e: any) => {
    setReceipent(e?.target?.value);
  }

  const handleTransfer = () => {
    setIsLoading(true);
    sendTransaction({ to: receipent, value: utils.parseEther(amount.toString()) });
  }

  useEffect(() => {
    if (amount > 0 && receipent) {
      setDisabledButton(false);
    }
  }, [amount, receipent])

  const toastMessage = (values: any) => {
    toast({
      title: `${values?.errorMessage}`,
      status: STATUS_CONFIG[values?.status],
      isClosable: true,
      position: "top",
    })
  }

  useEffect(() => {
    if (state?.status === "Exception" || state?.status === "Success" || state?.status === "Fail") {
      setIsLoading(false);
      toastMessage(state);
    }
  }, [state])

  useEffect(() => {
    if (etherBalance && amount) {
      const count = formatEther(etherBalance);
      if(Number(amount) > Number(count)) {
        setButtonText('余额不足');
        setDisabledButton(true);
      } else {
        setButtonText('转移');
        setDisabledButton(false);
      }
    }
  }, [amount, etherBalance]);

  return (
    <>
      <Flex
        margin="auto"
        paddingTop={isMobile ? "10vh" : isTablet ? "12vh" : "15vh"}
        width="100%"
        minWidth="500px"
      >
        <FormControl isRequired>
          <Box
            w="450px"
            borderRadius="35px"
            m="auto"
            backgroundColor="withAlpha(gray.900, 0.9)"
            boxShadow="2xl"
            p="25px"
          >
            <Box
              id="Receipent Field"
              p="5"
              height="80px"
              backgroundColor="gray.100"
              borderRadius="25"
            >
              <Flex>
                <InputGroup>
                  <Input
                    id="receipent"
                    p="0"
                    border="0"
                    placeholder="账户"
                    w="100%"
                    focusBorderColor="none"
                    onChange={handlesetReceipentInputChange}
                  />
                </InputGroup>
              </Flex>
            </Box>
            <Flex height="2"></Flex>
            <Box
              id="Amount Field"
              p="5"
              height="80px"
              backgroundColor="gray.100"
              borderRadius="25"
            >
              <Flex>
                <InputGroup>
                  <NumberInput w="100%" focusBorderColor="none">
                    <NumberInputField
                      id="amount"
                      p="0"
                      placeholder="0.0"
                      border="0"
                      onChange={handleAmountInputChange}
                    />
                  </NumberInput>
                </InputGroup>
              </Flex>
            </Box>
            <Flex height="2"></Flex>
            <Center>
              <Button
                id="Transfer Button"
                border="0"
                w="100%"
                h="60px"
                borderRadius="25"
                onClick={handleTransfer}
                isDisabled={disabledButton}
                isLoading={isLoading}
                loadingText='正在转移中...'
                colorScheme='teal'
              >
                {buttonText}
              </Button>
            </Center>
          </Box>
        </FormControl>
      </Flex>
    </>
  );
}

export default TransferringEthers;