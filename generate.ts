import { mkdirSync, writeFileSync } from "node:fs";
import { profile as p, themes, type Theme } from "../profile.config";

type Seg = [text: string, cls: string];

const prompt = (cmd: string): Seg[] => [
  [`${p.user}@${p.host}`, "user"], [":", "dim"], [p.cwd, "path"], ["$ ", "dim"], [cmd, "cmd"],
];
const bullet = (s: string): Seg[] => [["▸ ", "accent"], [s, "fg"]];

const lines: Seg[][] = [
  prompt("whoami"),
  [[p.name, "accent"], [" — ", "dim"], [p.role, "fg"]],
  [],
  prompt("cat stack.txt"),
  [[p.stack.join("  ·  "), "fg"]],
  [],
  prompt("cat focus.md"),
  ...p.focus.map(bullet),
  [],
  prompt("ls ~/interests"),
  ...p.interests.map(bullet),
  [],
  [...prompt(""), ["█", "blink"]],
];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const CH = 8.4, LH = 22, PAD = 24, BAR = 40;
const cols = Math.max(...lines.map((l) => l.reduce((n, [t]) => n + [...t].length, 0)));
const W = Math.max(640, Math.ceil(cols * CH + PAD * 2));
const H = BAR + PAD + lines.length * LH + PAD / 2;

function render(t: Theme): string {
  const body = lines
    .map((segs, i) =>
      segs.length
        ? `<text class="ln" style="animation-delay:${(i * 0.18).toFixed(2)}s" x="${PAD}" y="${BAR + PAD + i * LH}" xml:space="preserve">${segs
            .map(([s, c]) => `<tspan class="${c}">${esc(s)}</tspan>`)
            .join("")}</text>`
        : ""
    )
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(p.name)} — ${esc(p.role)}">
<style>
text{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;font-size:14px}
.fg{fill:${t.fg}}.dim{fill:${t.dim}}.user{fill:${t.user}}.path{fill:${t.path}}.cmd{fill:${t.cmd}}.accent{fill:${t.accent}}.blink{fill:${t.accent}}
.ln{opacity:0;animation:in .3s ease forwards}
.blink{animation:b 1s steps(1) infinite}
@keyframes in{to{opacity:1}}
@keyframes b{50%{fill-opacity:0}}
@media (prefers-reduced-motion:reduce){.ln{opacity:1;animation:none}.blink{animation:none}}
</style>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="10" fill="${t.bg}" stroke="${t.border}"/>
<path d="M.5 10.5a10 10 0 0 1 10-10h${W - 21}a10 10 0 0 1 10 10V${BAR}H.5z" fill="${t.bar}"/>
<line x1=".5" y1="${BAR}" x2="${W - 0.5}" y2="${BAR}" stroke="${t.border}"/>
<circle cx="22" cy="20" r="6" fill="#ff5f56"/><circle cx="42" cy="20" r="6" fill="#ffbd2e"/><circle cx="62" cy="20" r="6" fill="#27c93f"/>
${body}
</svg>
`;
}

mkdirSync(p.output.dir, { recursive: true });
writeFileSync(`${p.output.dir}/${p.output.dark}`, render(themes.dark));
writeFileSync(`${p.output.dir}/${p.output.light}`, render(themes.light));
console.log(`wrote ${p.output.dir}/${p.output.dark}, ${p.output.dir}/${p.output.light}`);
