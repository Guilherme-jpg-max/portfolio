import { createFileRoute } from "@tanstack/react-router";
import { CurriculoPage } from "@/components/CurriculoPage";

export const Route = createFileRoute("/curriculo")({
  component: CurriculoPage,
});