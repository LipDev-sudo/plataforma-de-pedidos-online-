import { UtensilsCrossed } from "lucide-react";
import { restaurante } from "../../restaurante";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" aria-label={restaurante.nome}>
      <UtensilsCrossed
        aria-hidden="true"
        className={compact ? "h-7 w-7" : "h-8 w-8"}
        strokeWidth={1.75}
      />
      <div>
        <p className={`${compact ? "text-xl" : "text-2xl"} font-bold leading-none tracking-[-0.04em]`}>
          {restaurante.nome}
        </p>
        {!compact && (
          <p className="mt-1 text-xs leading-none text-muted-foreground">
            {restaurante.chamada}
          </p>
        )}
      </div>
    </div>
  );
}
