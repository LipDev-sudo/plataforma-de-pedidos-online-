import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function Layout() {
  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-[#0D0D0D] relative shadow-2xl shadow-black/40">
      <Outlet />
      <BottomNav />
      {/* Footer */}
      <footer className="pb-24 pt-8 px-4 border-t border-white/[0.05]">
        <div className="flex items-center justify-center gap-6 text-[12px] text-[#9A9A9A]">
          <a href="https://github.com/LipDev-sudo/plataforma-de-pedidos-online-" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Código</a>
          <span className="text-white/10">|</span>
          <a href="https://lipdev.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Portfólio</a>
          <span className="text-white/10">|</span>
          <span>Demonstração local</span>
        </div>
        <p className="text-center text-[11px] text-[#4A4A4A] mt-3">
          FoodDash &copy; 2026 · Nenhum pedido real é processado
        </p>
      </footer>
    </div>
  );
}
