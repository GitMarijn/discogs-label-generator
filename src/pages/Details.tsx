import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRelease } from "../api/discogs";
import { useForm } from "@mantine/form";
import { TextInput, Button, Container, Title, Loader, NumberInput } from "@mantine/core";

export default function Details() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get("id")!;

  const { data, isLoading, error } = useQuery({
    queryKey: ["release", id],
    queryFn: () => fetchRelease(id),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      year: 0,
      artist: "",
      title: "",
      styles: "",
      extraNotes: "",
    },
    validate: {
      year: (value) => (value < 1900 || value > new Date().getFullYear() + 1 ? 'Invalid year' : null),
      artist: (value) => (!value ? 'Artist is required' : value.length > 200 ? 'Artist name too long' : null),
      title: (value) => (!value ? 'Title is required' : value.length > 200 ? 'Title too long' : null),
      styles: (value) => (!value ? 'At least one style is required' : null),
      extraNotes: (value) => (value && value.length > 500 ? 'Extra notes too long' : null),
    },
  });

  if (isLoading) return <Loader />;
  if (error || !data) return <div>Error loading release</div>;

  if (form.values.year === 0) {
    form.setValues({
      year: data.year,
      artist: data.artist,
      title: data.title,
      styles: data.styles.join(", "),
      extraNotes: "",
    });
  }

  const handleConfirm = (values: any) => {
    const payload = {
      ...values,
      styles: values.styles.split(",").map((s: string) => s.trim()).filter(Boolean),
    };
    navigate("/confirm", { state: payload });
  };

  return (
    <Container size="xs" mt="xl">
      <Title order={3} mb="md">Edit Release Info</Title>
      <form onSubmit={form.onSubmit(handleConfirm)}>
        <TextInput 
          label="Artist" 
          {...form.getInputProps("artist")} 
          mb="sm" 
          required
        />
        <TextInput 
          label="Title" 
          {...form.getInputProps("title")} 
          mb="sm" 
          required
        />
        <NumberInput 
          label="Year" 
          {...form.getInputProps("year")} 
          mb="sm" 
          min={1900}
          max={new Date().getFullYear() + 1}
          required
        />
        <TextInput
          label="Styles"
          {...form.getInputProps("styles")}
          mb="sm"
          required
        />
        <TextInput 
          label="Extra notes"
          {...form.getInputProps("extraNotes")} 
          mb="md" 
        />
        <Button type="submit">Generate label</Button>
      </form>
    </Container>
  );
}