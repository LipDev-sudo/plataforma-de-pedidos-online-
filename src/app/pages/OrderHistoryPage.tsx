import { useNavigate } from "react-router";
import { Package, Clock, CheckCircle2, Truck, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";

const statusConfig = {
  preparando: {
    label: "Preparando",
    color: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    icon: Clock,
  },
  "a caminho": {
    label: "A Caminho",
    color: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    icon: Truck,
  },
  entregue: {
    label: "Entregue",
    color: "bg-success/10 text-success border border-success/20",
    icon: CheckCircle2,
  },
};

export function OrderHistoryPage() {
  const { orders } = useCart();
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] px-4">
        <div className="w-20 h-20 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-4 border border-white/[0.06]">
          <Package className="w-10 h-10 text-primary drop-shadow-[0_0_8px_rgba(234,29,44,0.4)]" />
        </div>
        <h2 className="mb-2 text-white">Nenhum pedido</h2>
        <p className="text-[#6B6B6B] text-center text-[14px] mb-6">
          Seus pedidos aparecerao aqui apos sua primeira compra.
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          Explorar cardapio
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-white">Meus Pedidos</h1>
        <p className="text-[#6B6B6B] text-[14px] mt-1">
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
              className="bg-[#1A1A1A] rounded-2xl border border-white/[0.06] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[13px] text-[#8A8A8A]">{order.id}</p>
                  <p className="text-[12px] text-[#6B6B6B] mt-0.5">
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
                <div className="border-t border-white/[0.06] pt-2 mb-2">
                  {order.items.map((ci) => (
                    <p key={ci.cartId} className="text-[13px] text-[#6B6B6B]">
                      {ci.quantity}x {ci.item.name}
                    </p>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                <div>
                  <p className="text-[12px] text-[#6B6B6B]">{order.address}</p>
                  <p className="text-primary mt-0.5 font-semibold">
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
                    className="text-primary text-[13px] flex items-center gap-1 hover:gap-2 transition-all"
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
