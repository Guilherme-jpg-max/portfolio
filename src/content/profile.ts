const WHATSAPP_NUMBER = "5588921715211";
const WHATSAPP_GREETING = "Olá, vi seu portfólio e gostaria de falar sobre uma oportunidade!";

export const profile = {
  name: "Guilherme Carlos",
  fullName: "Guilherme Carlos Sousa da Silva",
  headline: "Desenvolvedor Full Stack Jr · C# · .NET · React · TypeScript · MySQL · PostgreSQL",
  phone: "(88) 92171-5211",
  email: "guilhermecarlostrabalho@gmail.com",
  location: "Crato, Ceará, Brasil",
  /** Ano de início da carreira; o rodapé exibe o "uptime" a partir dele. */
  careerStartYear: 2017,
  links: {
    whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_GREETING)}`,
    github: "https://github.com/Guilherme-jpg-max",
    linkedin: "https://www.linkedin.com/in/guilhermecarlos03/",
  },
  resumePdf: {
    // Atualize este caminho sempre que trocar o arquivo em public/.
    url: "/Curriculo_Guilherme%20Carlos.pdf",
    downloadName: "curriculo-guilherme.pdf",
  },
} as const;
