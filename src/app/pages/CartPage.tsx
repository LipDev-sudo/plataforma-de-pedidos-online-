import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { useCart } from "../context/CartContext";

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const total = getTotal();
  const deliveryFee = total > 80 ? 0 : 8.9;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary text-primary">
          <ShoppingBag className="h-9 w-9" strokeWidth={1.6} aria-hidden="true" />
        </div>
        <h1 className="mt-5">Seu carrinho está vazio</h1>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Escolha uma pizza do Forno da Vila para começar seu pedido demonstrativo.
        </p>
        <button
          type="button"
          onClick={() => navigate("/menu")}
          className="mt-6 flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white"
        >
          Ver cardápio
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <div className="pb-52">
      <div className="flex items-center justify-between px-4 pb-4 pt-6 sm:px-6 sm:pt-8">
        <div>
          <h1>Seu carrinho</h1>
          <p className="mt-1 text-sm text-muted-foreground">Pedido no Forno da Vila</p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-bold text-destructive hover:bg-destructive/5"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Limpar
        </button>
      </div>

      <div className="grid gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="space-y-3">
          {items.map((cartItem) => (
            <article
              key={cartItem.cartId}
              className="flex gap-4 rounded-2xl border border-border bg-white p-3 shadow-[0_6px_22px_rgba(35,31,27,0.04)] sm:p-4"
            >
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-28 sm:w-32">
                <ImageWithFallback
                  src={cartItem.item.image}
                  alt={cartItem.item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="line-clamp-1 text-base">{cartItem.item.name}</h2>
                  <button
                    type="button"
                    onClick={() => removeItem(cartItem.cartId)}
                    aria-label={`Remover ${cartItem.item.name} do carrinho`}
                    className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/5 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                {Object.keys(cartItem.customizations).length > 0 && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {Object.values(cartItem.customizations).join(" · ")}
                  </p>
                )}
                <div className="mt-auto flex items-end justify-between gap-3 pt-2">
                  <span className="text-sm font-extrabold">
                    {formatCurrency(cartItem.totalPrice)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(cartItem.cartId, cartItem.quantity - 1)
                      }
                      aria-label={`Diminuir quantidade de ${cartItem.item.name}`}
                      className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border bg-background"
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="w-5 text-center text-sm font-bold">
                      {cartItem.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(cartItem.cartId, cartItem.quantity + 1)
                      }
                      aria-label={`Aumentar quantidade de ${cartItem.item.name}`}
                      className="flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-primary text-white"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="hidden h-fit rounded-2xl border border-border bg-white p-5 lg:block">
          <h2 className="text-lg">Resumo</h2>
          <Summary total={total} deliveryFee={deliveryFee} />
          <CheckoutButton onClick={() => navigate("/checkout")} />
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-border bg-white/98 p-4 shadow-[0_-8px_28px_rgba(35,31,27,0.06)] backdrop-blur-md lg:hidden">
        <div className="mx-auto max-w-6xl">
          <Summary total={total} deliveryFee={deliveryFee} compact />
          <CheckoutButton onClick={() => navigate("/checkout")} />
        </div>
      </div>
    </div>
  );
}

function Summary({
  total,
  deliveryFee,
  compact = false,
}: {
  total: number;
  deliveryFee: number;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mb-3 space-y-1.5" : "my-5 space-y-3"}>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Entrega</span>
        <span className={deliveryFee === 0 ? "font-bold text-success" : ""}>
          {deliveryFee === 0 ? "Grátis" : formatCurrency(deliveryFee)}
        </span>
      </div>
      <div className="flex justify-between border-t border-border pt-2 font-extrabold">
        <span>Total</span>
        <span className="text-primary">{formatCurrency(total + deliveryFee)}</span>
      </div>
    </div>
  );
}

function CheckoutButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white transition-colors hover:bg-[#a93622]"
    >
      Continuar para o checkout
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
