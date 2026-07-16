import { CheckCircle2, ChevronRight, Clock3, Package, Truck } from "lucide-react";
import { useNavigate } from "react-router";
import { useCart, type Order } from "../context/CartContext";

const statusConfig = {
  preparando: {
    label: "Preparando",
    className: "border-warning/25 bg-warning/8 text-warning",
    icon: Clock3,
  },
  "a caminho": {
    label: "A caminho",
    className: "border-info/25 bg-info/8 text-info",
    icon: Truck,
  },
  entregue: {
    label: "Entregue",
    className: "border-success/25 bg-success/8 text-success",
    icon: CheckCircle2,
  },
};

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function OrderHistoryPage() {
  const { orders, advanceOrderStatus, repeatOrder } = useCart();
  const navigate = useNavigate();

  const handleOrderAction = (order: Order) => {
    if (order.status === "entregue") {
      repeatOrder(order.id);
      navigate("/cart");
      return;
    }
    advanceOrderStatus(order.id);
  };

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Package className="h-9 w-9" strokeWidth={1.6} aria-hidden="true" />
        </div>
        <h1 className="mt-5">Nenhum pedido por aqui</h1>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Seus pedidos demonstrativos aparecerão aqui depois da confirmação.
        </p>
        <button
          type="button"
          onClick={() => navigate("/menu")}
          className="mt-6 min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white"
        >
          Explorar cardápio
        </button>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="px-4 pb-4 pt-6 sm:px-6 sm:pt-8">
        <h1>Seus pedidos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acompanhe a simulação de preparo e entrega do Forno da Vila.
        </p>
      </div>

      <section className="grid gap-4 px-4 sm:px-6 lg:grid-cols-2">
        {orders.map((order) => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;
          const actionLabel =
            order.status === "preparando"
              ? "Simular saída"
              : order.status === "a caminho"
                ? "Simular entrega"
                : "Pedir novamente";

          return (
            <article
              key={order.id}
              className="rounded-2xl border border-border bg-white p-5 shadow-[0_6px_22px_rgba(35,31,27,0.04)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold">{order.id}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{order.date}</p>
                </div>
                <span
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${status.className}`}
                >
                  <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {status.label}
                </span>
              </div>

              <div className="mt-4 space-y-1 border-t border-border pt-4">
                {order.items.map((cartItem) => (
                  <p key={cartItem.cartId} className="text-sm text-muted-foreground">
                    {cartItem.quantity}× {cartItem.item.name}
                  </p>
                ))}
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <p className="text-sm font-semibold">{order.address}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Pagamento: {order.paymentMethod}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-lg font-extrabold text-primary">
                    {formatCurrency(order.total)}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleOrderAction(order)}
                    className="flex min-h-11 items-center gap-1 rounded-xl px-3 text-sm font-bold text-primary hover:bg-primary/5"
                  >
                    {actionLabel}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
