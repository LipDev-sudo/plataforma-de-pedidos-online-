import { Home, UtensilsCrossed, ShoppingCart, Clock } from "lucide-react";
import { NavLink } from "react-router";
import { useCart } from "../context/CartContext";

const navItems = [
  { to: "/", icon: Home, label: "Início" },
  { to: "/menu", icon: UtensilsCrossed, label: "Cardápio" },
  { to: "/cart", icon: ShoppingCart, label: "Carrinho" },
  { to: "/orders", icon: Clock, label: "Pedidos" },
];

export function BottomNav() {
  const { getItemCount } = useCart();
  const count = getItemCount();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {navItems.map((nav) => (
          <NavLink
            key={nav.to}
            to={nav.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors relative ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <nav.icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                  {nav.label === "Carrinho" && count > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                      {count}
                    </span>
                  )}
                </div>
                <span className="text-[11px]">{nav.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
