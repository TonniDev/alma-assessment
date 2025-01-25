import AssessmentForm from '@app/immigration-assessment/components/AssessmentForm/AssessmentForm';
import { Flex, Image, Text } from '@chakra-ui/react';
import { colors } from '@ui/base/theme/theme.colors';

export default async function ImmigrationAssessmentPage() {
  return (
    <>
      <Flex
        justify="center"
        alignItems="flex-start"
        w="100vw"
        padding={5}
        h="355px"
        bgColor={colors.secondary['200'].value}
        bgImage={{ base: 'none', lg: "url('/bg_assessment_form.png')" }}
        bgRepeat="no-repeat"
      >
        <Flex direction="column" gap={6} h="100%" w="100%" justify="center" maxW={{ base: '700px', xl: '900px' }}>
          <Image src="logo-alma.png" objectFit="contain" width="100px" alt="Alma logo" />
          <Text as="h1" fontSize="5xl" lineHeight="50px" fontWeight="bold" color="gray.900" mt={5}>
            Get An Assessment <br />
            Of Your Immigration Case
          </Text>
        </Flex>
      </Flex>

      <Flex justify="center" alignItems="flex-start" w="100vw" minH="100%" padding={5}>
        <Flex direction="column" gap={6} h="100%" w="100%" justify="center" maxW={{ base: '700px', xl: '900px' }}>
          <AssessmentForm />
        </Flex>
      </Flex>
    </>
  );
}
