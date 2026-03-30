import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function Layout() {
  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#0D0D0D] relative">
      <Outlet />
      <BottomNav />
      {/* Footer */}
      <footer className="pb-24 pt-8 px-4 border-t border-white/[0.05]">
        <div className="flex items-center justify-center gap-6 text-[12px] text-[#6B6B6B]">
          <a href="#" className="hover:text-foreground transition-colors">Sobre</a>
          <span className="text-white/10">|</span>
          <a href="#" className="hover:text-foreground transition-colors">Ajuda</a>
          <span className="text-white/10">|</span>
          <a href="#" className="hover:text-foreground transition-colors">Termos</a>
          <span className="text-white/10">|</span>
          <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
        </div>
        <p className="text-center text-[11px] text-[#4A4A4A] mt-3">
          FoodDash &copy; 2026
        </p>
      </footer>
    </div>
  );
}
