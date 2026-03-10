import { useNavigate } from "react-router";
import { Package, Clock, CheckCircle2, Truck, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";

const statusConfig = {
  preparando: {
    label: "Preparando",
    color: "bg-amber-100 text-amber-700",
    icon: Clock,
  },
  "a caminho": {
    label: "A Caminho",
    color: "bg-blue-100 text-blue-700",
    icon: Truck,
  },
  entregue: {
    label: "Entregue",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
};

export function OrderHistoryPage() {
  const { orders } = useCart();
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] px-4">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Package className="w-10 h-10 text-primary" />
        </div>
        <h2 className="mb-2">Nenhum pedido</h2>
        <p className="text-muted-foreground text-center text-[14px] mb-6">
          Seus pedidos aparecerão aqui após sua primeira compra.
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl"
        >
          Explorar cardápio
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="px-4 pt-6 pb-4">
        <h1>Meus Pedidos</h1>
        <p className="text-muted-foreground text-[14px] mt-1">
          {orders.length} {orders.length === 1 ? "pedido" : "pedidos"}
        </p>
      </div>

      <div className="px-4 space-y-3">
        {orders.map((order) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;
          return (
            <div
              key={order.id}
              className="bg-card rounded-2xl border border-border p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[13px] text-muted-foreground">{order.id}</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    {order.date}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[12px] flex items-center gap-1 ${config.color}`}
                >
                  <StatusIcon className="w-3.5 h-3.5" />
                  {config.label}
                </span>
              </div>

              {order.items.length > 0 && (
                <div className="border-t border-border pt-2 mb-2">
                  {order.items.map((ci) => (
                    <p key={ci.cartId} className="text-[13px] text-muted-foreground">
                      {ci.quantity}x {ci.item.name}
                    </p>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between border-t border-border pt-3">
                <div>
                  <p className="text-[12px] text-muted-foreground">{order.address}</p>
                  <p className="text-primary mt-0.5">
                    R$ {order.total.toFixed(2).replace(".", ",")}
                  </p>
                </div>
                {order.status === "preparando" && (
                  <div className="flex items-center gap-1 text-primary text-[13px]">
                    Acompanhar <ChevronRight className="w-4 h-4" />
                  </div>
                )}
                {order.status === "entregue" && (
                  <button
                    onClick={() => navigate("/menu")}
                    className="text-primary text-[13px] flex items-center gap-1"
                  >
                    Pedir novamente <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
