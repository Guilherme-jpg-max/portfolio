import commitStats from "@/data/commit-stats.json";
import { profile } from "./profile";

/**
 * Linhas exibidas na tela do monitor 3D. Linhas iniciadas por `root@dev` são
 * desenhadas como prompt; um `_` final vira o cursor piscante.
 */
export const bootScreenLines: readonly string[] = [
  "BIOS v2.4.1 — POST OK",
  "mounting /dev/persona ......... [ OK ]",
  "loading identity module ....... [ OK ]",
  "init shell .................... [ OK ]",
  "",
  "root@dev:~$ whoami",
  `> ${profile.name}`,
  "> full-stack Developer / systems",
  "",
  "root@dev:~$ status",
  "available for new projects",
  "",
  "root@dev:~$ git log --all --oneline | wc -l",
  `> ${commitStats.total.toLocaleString("pt-BR")} commits`,
  "",
  "root@dev:~$ _",
];
