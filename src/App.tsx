import { Routes, Route } from "react-router-dom";
import { AppShell } from "@mantine/core";
import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Confirm from "./pages/Confirm";
import type { ReleaseFormData } from "./schemas/release";

export type { ReleaseFormData };

export default function App() {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/confirm" element={<Confirm />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}