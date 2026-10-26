export interface Theme {
  bg: string; bar: string; border: string;
  fg: string; dim: string; user: string; path: string; cmd: string; accent: string;
}

export const profile = {
  user: "kaushal",
  host: "dev",
  cwd: "~",
  name: "Kaushal",
  role: "Software Developer | B.Tech CSE",
  stack: ["Next.js", "React", "TypeScript", "C++", "Python", "SQL"],
  focus: [
    "AI-powered brand governance platforms",
    "Local LLMs (Ollama)",
    "Hackathons (SIH 2026)",
  ],
  interests: ["Overgeared", "The Greatest Estate Developer", "Rapid prototyping"],
  output: { dir: "assets", dark: "terminal-dark.svg", light: "terminal-light.svg" },
};

export const themes: { dark: Theme; light: Theme } = {
  dark: {
    bg: "#0d1117", bar: "#161b22", border: "#30363d",
    fg: "#c9d1d9", dim: "#8b949e", user: "#7ee787",
    path: "#79c0ff", cmd: "#ffa657", accent: "#d2a8ff",
  },
  light: {
    bg: "#ffffff", bar: "#f6f8fa", border: "#d0d7de",
    fg: "#24292f", dim: "#57606a", user: "#1a7f37",
    path: "#0969da", cmd: "#953800", accent: "#8250df",
  },
};
