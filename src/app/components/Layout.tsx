import { MapPin } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import { BottomNav } from "./BottomNav";
import { BrandMark } from "./BrandMark";

const desktopLinks = [
  { to: "/", label: "Início" },
  { to: "/menu", label: "Cardápio" },
  { to: "/cart", label: "Carrinho" },
  { to: "/orders", label: "Pedidos" },
];

export function Layout() {
  return (
    <div className="min-h-screen bg-[#f6f4f0] text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <NavLink to="/" className="text-primary">
            <span className="hidden sm:block">
              <BrandMark />
            </span>
            <span className="sm:hidden">
              <BrandMark compact />
            </span>
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
                      ? "bg-primary/8 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 text-left sm:flex">
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            <div>
              <p className="text-[11px] leading-none text-muted-foreground">Entregar em</p>
              <p className="mt-1 text-sm font-semibold">Informe no checkout</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto min-h-[calc(100vh-72px)] max-w-6xl bg-background">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-white pb-24 pt-6 lg:pb-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left">
          <p>Mesaora é uma demonstração. Nenhum pedido ou pagamento real é processado.</p>
          <div className="flex justify-center gap-5">
            <a
              href="https://github.com/LipDev-sudo/plataforma-de-pedidos-online-"
              target="_blank"
              rel="noreferrer"
              className="font-semibold hover:text-primary"
            >
              Código
            </a>
            <a
              href="https://lipdev.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold hover:text-primary"
            >
              Portfólio
            </a>
          </div>
        </div>
      </footer>

      <BottomNav />
    </div>
  );
}
