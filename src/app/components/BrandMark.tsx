import { restaurante } from "../../restaurante";

/** Logo e nome do restaurante. Sem logo configurada, a demonstração mostra o espaço reservado. */
export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3" aria-label={restaurante.nome}>
      {restaurante.logo ? (
        <img src={restaurante.logo} alt="" aria-hidden="true" className="h-9 w-auto shrink-0" />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-dashed border-foreground/20 text-[11px] font-medium text-subtle-foreground"
        >
          logo
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-[17px] font-medium leading-tight text-foreground">{restaurante.nome}</p>
        {!compact && <p className="mt-0.5 truncate text-xs text-muted-foreground">{restaurante.chamada}</p>}
      </div>
    </div>
  );
}
