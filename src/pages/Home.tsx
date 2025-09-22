import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { Button, TextInput, Container, Title } from "@mantine/core";
import { parseReleaseId } from "../api/discogs";

export default function Home() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { url: "" },
    validate: {
      url: (value) => {
        if (!value) return "URL is required";
        const id = parseReleaseId(value);

        return !id ? "Invalid Discogs URL" : null;
      },
    },
  });

  const handleSubmit = (values: { url: string }) => {
    const id = parseReleaseId(values.url);
    if (id) {
      navigate(`/details?id=${id}`);
    }
  };

  return (
    <Container size="xs" mt="xl" mx="auto" >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          placeholder="Paste Discogs release URL"
          {...form.getInputProps("url")}
        
          mb="md"
        />
        <Button 
          disabled={form.submitting || !form.values.url.trim()}
          mx="auto"
          mt="xl"
          style={{ display: "block" }}
          type="submit" 
        >
         Find release
        </Button>
      </form>
    </Container>
  );
}