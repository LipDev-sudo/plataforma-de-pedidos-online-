import { Eye, EyeOff, MapPin } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { BottomNav } from "./BottomNav";
import { BrandMark } from "./BrandMark";
import { MarcadoresContext } from "../context/marcadores";
import { Marcado } from "./Marcado";
import { SeloAchse } from "./SeloAchse";
import { restaurante } from "../../restaurante";

const desktopLinks = [
  { to: "/", label: "Início" },
  { to: "/menu", label: "Cardápio" },
  { to: "/cart", label: "Carrinho" },
  { to: "/orders", label: "Pedidos" },
];

export function Layout() {
  const [marcadores, setMarcadores] = useState(restaurante.demonstracao);
  return (
    <MarcadoresContext.Provider value={marcadores}>
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <NavLink to="/" className="inline-flex min-h-11 min-w-0 items-center rounded-lg">
            <Marcado rotulo="Sua logo e seu nome aqui" posicao="abaixo">
              <span className="hidden sm:block">
                <BrandMark />
              </span>
              <span className="sm:hidden">
                <BrandMark compact />
              </span>
            </Marcado>
          </NavLink>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {desktopLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 text-left sm:flex">
            <MapPin className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <p className="text-xs leading-none text-muted-foreground">Entregar em</p>
              <p className="mt-1 text-sm font-medium">Informe no checkout</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto min-h-[calc(100vh-72px)] max-w-6xl bg-background">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card pb-24 pt-6 lg:pb-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left">
          <p>{restaurante.rodape.texto}</p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {restaurante.rodape.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center font-medium transition-colors hover:text-foreground"
              >
                {link.rotulo}
              </a>
            ))}
            {restaurante.selo && <SeloAchse />}
          </div>
        </div>
      </footer>

      <BottomNav />

      {restaurante.demonstracao && (
        <button
          type="button"
          onClick={() => setMarcadores((v) => !v)}
          aria-pressed={marcadores}
          className="fixed bottom-20 left-4 z-40 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-secondary px-4 text-sm font-medium text-foreground shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-colors hover:bg-[#262a31] lg:bottom-6 lg:left-6"
        >
          {marcadores ? <EyeOff className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" /> : <Eye className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />}
          <span className="hidden sm:inline">{marcadores ? "Ocultar marcações" : "Ver onde entra sua marca"}</span>
          <span className="sm:hidden">Marcações</span>
        </button>
      )}
    </div>
    </MarcadoresContext.Provider>
  );
}
