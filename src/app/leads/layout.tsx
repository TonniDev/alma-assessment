import { LogoutButton } from '@app/leads/components/LogoutButton';
import LeadsPage from '@app/leads/page';
import { Flex, Image, Text } from '@chakra-ui/react';

export default function LeadsLayout() {
  return (
    <Flex w="100vw" h="100vh" direction="row">
      <Flex
        direction="column"
        gap={4}
        w="300px"
        h="100%"
        borderRight="1px solid"
        borderColor="gray.200"
        p={3}
        background={`radial-gradient(120% 60% at 10% -20%, #fffd01 40%, #ffffff00 100%)`}
      >
        <Image src="logo-alma.png" objectFit="contain" width="100px" alt="Alma logo" />
        <Flex direction="column" gap={8} py={5} grow={2}>
          <Text fontWeight="bold" cursor="pointer">
            Leads
          </Text>
          <Text cursor="pointer">Settings</Text>
        </Flex>
        <Flex>
          <LogoutButton />
        </Flex>
      </Flex>
      <LeadsPage />
    </Flex>
  );
}
