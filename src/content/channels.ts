import { profile } from "./profile";
import type { Channel } from "./types";

export const channels: Channel[] = [
  {
    id: "01",
    kind: "whatsapp",
    label: "whatsapp",
    detail: "resposta mais rápida",
    href: profile.links.whatsapp,
  },
  {
    id: "03",
    kind: "linkedin",
    label: "linkedin",
    detail: "trajetória e recomendações",
    href: profile.links.linkedin,
  },
  {
    id: "04",
    kind: "github",
    label: "github",
    detail: "código-fonte dos projetos",
    href: profile.links.github,
  },
  {
    id: "05",
    kind: "resume",
    label: "currículo",
    detail: "PDF completo",
    to: "/curriculo",
  },
];
