import { Home, Search, ShoppingCart, ClipboardList, User } from "lucide-react";
import { NavLink } from "react-router";
import { useCart } from "../context/CartContext";

const navItems = [
  { to: "/", icon: Home, label: "Inicio" },
  { to: "/menu", icon: Search, label: "Buscar" },
  { to: "/cart", icon: ShoppingCart, label: "Carrinho" },
  { to: "/orders", icon: ClipboardList, label: "Pedidos" },
  { to: "#", icon: User, label: "Perfil" },
];

export function BottomNav() {
  const { getItemCount } = useCart();
  const count = getItemCount();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-xl border-t border-white/[0.06]">
      <div className="max-w-lg mx-auto flex items-center justify-around py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {navItems.map((nav) => (
          <NavLink
            key={nav.to + nav.label}
            to={nav.to}
            end={nav.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 relative ${
                isActive
                  ? "text-primary"
                  : "text-[#6B6B6B] hover:text-foreground/70"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  {isActive && (
                    <div className="absolute -inset-2 bg-primary/10 rounded-xl animate-pulse-glow" />
                  )}
                  <nav.icon
                    className={`w-5 h-5 relative z-10 transition-all ${
                      isActive ? "stroke-[2.5] drop-shadow-[0_0_6px_rgba(234,29,44,0.5)]" : "stroke-[1.5]"
                    }`}
                  />
                  {nav.label === "Carrinho" && count > 0 && (
                    <span className="absolute -top-2 -right-3 bg-primary text-primary-foreground rounded-full min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold z-20 shadow-lg shadow-primary/40 neon-border">
                      {count > 9 ? "9+" : count}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] ${isActive ? "font-semibold text-primary" : ""}`}>
                  {nav.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
