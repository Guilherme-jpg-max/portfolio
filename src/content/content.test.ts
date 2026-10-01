import { describe, expect, it } from "vitest";
import { channels } from "./channels";
import { profile } from "./profile";
import { projects } from "./projects";

describe("profile", () => {
  it("monta o link do WhatsApp com a mensagem codificada", () => {
    expect(profile.links.whatsapp).toBe(
      "https://wa.me/5588921715211?text=Ol%C3%A1%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20falar%20sobre%20uma%20oportunidade!",
    );
  });

  it("aponta o PDF do currículo para a pasta public", () => {
    expect(profile.resumePdf.url.startsWith("/")).toBe(true);
    expect(profile.resumePdf.url.endsWith(".pdf")).toBe(true);
  });
});

describe("projects", () => {
  it("tem ids únicos", () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("usa https nos repositórios públicos", () => {
    for (const project of projects) {
      if (project.github) expect(project.github).toMatch(/^https:\/\/github\.com\//);
    }
  });
});

describe("channels", () => {
  it("tem ids únicos e um destino em cada canal", () => {
    const ids = channels.map((channel) => channel.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const channel of channels) {
      expect(channel.href ?? channel.to).toBeTruthy();
    }
  });
});
