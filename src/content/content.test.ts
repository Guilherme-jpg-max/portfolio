import { describe, expect, it } from "vitest";
import { channels } from "./channels";
import { sidePhase } from "./journey";
import { profile } from "./profile";
import { projects } from "./projects";
import { experiences } from "./resume";

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

  it("aponta cada experienceId para uma experiência que existe", () => {
    const experienceIds = new Set(experiences.map((experience) => experience.id));
    for (const project of projects) {
      if (project.experienceId !== null) {
        expect(experienceIds, `projeto ${project.id}`).toContain(project.experienceId);
      }
    }
  });
});

describe("experiences", () => {
  it("tem ids únicos, diferentes do id da fase pessoal", () => {
    const ids = experiences.map((experience) => experience.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).not.toContain(sidePhase.id);
  });

  it("usa ids que funcionam como nome de pasta no terminal", () => {
    for (const experience of experiences) expect(experience.id).toMatch(/^[a-z0-9-]+$/);
  });

  it("tem datas AAAA-MM válidas, com o fim depois do início", () => {
    const month = /^\d{4}-(0[1-9]|1[0-2])$/;
    for (const { id, start, end } of experiences) {
      expect(start, id).toMatch(month);
      if (end !== null) {
        expect(end, id).toMatch(month);
        expect(end >= start, id).toBe(true);
      }
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
