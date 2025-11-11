import { Container, Center, Loader } from "@mantine/core";

export default function LoadingSpinner() {
  return (
    <Container size='xs' mt='xl'>
      <Center>
        <Loader />
      </Center>
    </Container>
  );
}
