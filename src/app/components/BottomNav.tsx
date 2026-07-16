import { BookOpen, ClipboardList, Home, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router";
import { useCart } from "../context/CartContext";

const navItems = [
  { to: "/", icon: Home, label: "Início" },
  { to: "/menu", icon: BookOpen, label: "Cardápio" },
  { to: "/cart", icon: ShoppingCart, label: "Carrinho" },
  { to: "/orders", icon: ClipboardList, label: "Pedidos" },
];

export function BottomNav() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/98 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(35,31,27,0.06)] lg:hidden"
      aria-label="Navegação principal"
    >
      <div className="mx-auto grid h-16 max-w-md grid-cols-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `relative flex min-h-11 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <div className="relative">
              <item.icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
              {item.to === "/cart" && itemCount > 0 && (
                <span className="absolute -right-3 -top-2 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </div>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
