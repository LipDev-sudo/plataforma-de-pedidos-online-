import { useContext, type ReactNode } from "react";
import { restaurante } from "../../restaurante";
import { MarcadoresContext } from "../context/marcadores";

interface MarcadoProps {
  rotulo: string;
  children: ReactNode;
  /** Onde fica a etiqueta: acima (padrão), abaixo, à direita ou dentro do elemento. */
  posicao?: "acima" | "abaixo" | "direita" | "dentro";
  /** Ocupa a largura toda (para seções e imagens). */
  bloco?: boolean;
}

export function Marcado({ rotulo, children, posicao = "acima", bloco = false }: MarcadoProps) {
  const ativo = useContext(MarcadoresContext) && restaurante.demonstracao;
  if (!ativo) return <>{children}</>;
  return (
    <span className={`marcado marcado-ativo ${bloco ? "marcado-bloco" : ""}`}>
      {children}
      <span className={`marcador ${posicao === "acima" ? "" : `marcador-${posicao}`}`} aria-hidden="true">
        {rotulo}
      </span>
    </span>
  );
}
