/** Selo "Desenvolvido por Achse", ligado em src/restaurante.ts (campo selo). */
export function SeloAchse() {
  return (
    <a
      href="https://achse.onrender.com/"
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-[#A3132A] bg-[#090A0C] py-1.5 pl-1.5 pr-4 text-left text-xs font-semibold text-white transition hover:border-[#C92A45]"
    >
      <img src="/achse/selo.png" alt="" width="32" height="32" className="h-8 w-8 rounded-full" />
      <span>
        <span className="block text-[0.6875rem] font-medium leading-none text-white/70">Desenvolvido por</span>
        <span className="mt-0.5 block text-sm font-medium leading-none tracking-[0.08em]">ACHSE</span>
      </span>
    </a>
  );
}
