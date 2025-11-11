import { useLocation } from "react-router-dom";
import { Container, Title, Text, Button } from "@mantine/core";

export default function Confirm() {
  const { state } = useLocation() as { state: any };
  if (!state) return <div>No data</div>;

  const { artist, title, year, styles, extraNotes } = state;

  const handlePrint = () => window.print();

  return (
    <Container size="xs" mt="xl">
      <Title order={2} mb="md">Release Info</Title>
      <Text><b>Artist:</b> {artist}</Text>
      <Text><b>Title:</b> {title}</Text>
      <Text><b>Year:</b> {year}</Text>
      <Text><b>Styles:</b> {styles.join(", ")}</Text>
     {extraNotes && <Text><b>Extra notes:</b> {extraNotes}</Text>}
      <Button mt="md" onClick={handlePrint}>Print</Button>
    </Container>
  );
}