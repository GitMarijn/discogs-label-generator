import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRelease, fetchPricingData } from "../api/discogs";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Container,
  Title,
  Loader,
  NumberInput,
  Center,
  Paper,
  Text,
  Group,
  Badge,
} from "@mantine/core";

export default function Details() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get("id")!;

  const { data, isLoading, error } = useQuery({
    queryKey: ["release", id],
    queryFn: () => fetchRelease(id),
  });

  const {
    data: pricingData,
    isLoading: isPricingLoading,
    error: pricingError,
  } = useQuery({
    queryKey: ["pricing", id],
    queryFn: () => fetchPricingData(id),
    enabled: !!id,
    retry: false, // Don't retry on auth errors
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      year: 0,
      artist: "",
      title: "",
      styles: "",
      extraNotes: "",
    },
    validate: {
      year: (value) =>
        value < 1900 || value > new Date().getFullYear() + 1
          ? "Invalid year"
          : null,
      artist: (value) =>
        !value
          ? "Artist is required"
          : value.length > 200
          ? "Artist name too long"
          : null,
      title: (value) =>
        !value
          ? "Title is required"
          : value.length > 200
          ? "Title too long"
          : null,
      styles: (value) => (!value ? "At least one style is required" : null),
      extraNotes: (value) =>
        value && value.length > 500 ? "Extra notes too long" : null,
    },
  });

  if (isLoading)
    return (
      <Container size='xs' mt='xl'>
        <Center>
          <Loader />
        </Center>
      </Container>
    );
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
      styles: values.styles
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean),
    };

    navigate("/confirm", { state: payload });
  };

  return (
    <Container size='xs' mt='xl'>
      <Title order={3} mb='md' ta='center'>
        Edit Release Info
      </Title>

      {!isPricingLoading &&
        pricingData &&
        Object.keys(pricingData).length > 0 && (
          <Paper p='md' mb='lg' withBorder>
            <Text size='sm' fw={500} mb='xs'>
              Market Pricing Information
            </Text>
            <Group gap='sm'>
              <Badge color='green' variant='light'>
                Low: {pricingData.low?.currency}{" "}
                {pricingData.low?.value.toFixed(2)}
              </Badge>
              <Badge color='blue' variant='light'>
                Median: {pricingData.median?.currency}{" "}
                {pricingData.median?.value.toFixed(2)}
              </Badge>
              <Badge color='red' variant='light'>
                High: {pricingData.high?.currency}{" "}
                {pricingData.high?.value.toFixed(2)}
              </Badge>
            </Group>
          </Paper>
        )}

      {!isPricingLoading && pricingError && (
        <Paper p='md' mb='lg' withBorder bg='yellow.0'>
          <Text size='sm' c='yellow.8'>
            Pricing information is not available. This may be due to missing
            authentication or no pricing data for this release.
          </Text>
        </Paper>
      )}

      <form onSubmit={form.onSubmit(handleConfirm)}>
        <TextInput
          label='Artist'
          {...form.getInputProps("artist")}
          mb='sm'
          required
        />
        <TextInput
          label='Title'
          {...form.getInputProps("title")}
          mb='sm'
          required
        />
        <NumberInput
          label='Year'
          {...form.getInputProps("year")}
          mb='sm'
          min={1900}
          max={new Date().getFullYear() + 1}
          required
        />
        <TextInput
          label='Styles'
          {...form.getInputProps("styles")}
          mb='sm'
          required
        />
        <TextInput
          label='Extra notes'
          {...form.getInputProps("extraNotes")}
          mb='md'
        />
        <Button
          type='submit'
          mx='auto'
          style={{ display: "block" }}
          disabled={
            !form.isValid() ||
            !form.values.artist ||
            !form.values.title ||
            !form.values.styles ||
            form.values.year === 0
          }
        >
          Generate label
        </Button>
      </form>
    </Container>
  );
}
