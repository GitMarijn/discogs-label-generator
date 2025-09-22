import { useNavigate } from "react-router-dom";
import { Title, Group, Box } from "@mantine/core";

export default function Header() {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate("/");
  };

  return (
    <Box h={60} px="md" style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}>
      <Group h="100%" justify="center">
        <Title
          order={1}
          style={{ cursor: "pointer" }}
          onClick={handleTitleClick}
        >
          Discogs label generator
        </Title>
      </Group>
    </Box>
  );
}