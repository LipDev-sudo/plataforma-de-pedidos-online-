export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" aria-label="Mesaora">
      <svg
        aria-hidden="true"
        className={compact ? "h-8 w-9" : "h-9 w-10"}
        viewBox="0 0 40 36"
        fill="none"
      >
        <path
          d="M5 27V8l15 10L35 8v19"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 32h35"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <div>
        <p className={`${compact ? "text-xl" : "text-2xl"} font-bold leading-none tracking-[-0.04em]`}>
          Mesaora
        </p>
        {!compact && (
          <p className="mt-1 text-[11px] leading-none text-muted-foreground">
            Do cardápio ao pedido, direto.
          </p>
        )}
      </div>
    </div>
  );
}
