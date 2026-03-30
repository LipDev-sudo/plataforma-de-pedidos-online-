import { useNavigate } from "react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const total = getTotal();
  const deliveryFee = total > 80 ? 0 : 8.90;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] px-4">
        <div className="w-20 h-20 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-4 border border-white/[0.06]">
          <ShoppingBag className="w-10 h-10 text-primary drop-shadow-[0_0_8px_rgba(234,29,44,0.4)]" />
        </div>
        <h2 className="mb-2 text-white">Carrinho vazio</h2>
        <p className="text-[#6B6B6B] text-center text-[14px] mb-6">
          Adicione itens deliciosos do nosso cardapio!
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          Ver cardapio <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="pb-48">
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white">Carrinho</h1>
          <button
            onClick={clearCart}
            className="text-destructive text-[13px] flex items-center gap-1 hover:text-destructive/80 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Limpar
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="px-4 space-y-3">
        {items.map((cartItem) => (
          <div
            key={cartItem.cartId}
            className="bg-[#1A1A1A] rounded-2xl border border-white/[0.06] p-3 flex gap-3"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-white/[0.06]">
              <ImageWithFallback
                src={cartItem.item.image}
                alt={cartItem.item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h4 className="text-[14px] truncate pr-2 text-foreground">{cartItem.item.name}</h4>
                <button
                  onClick={() => removeItem(cartItem.cartId)}
                  className="text-[#6B6B6B] p-1 hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {Object.entries(cartItem.customizations).length > 0 && (
                <p className="text-[11px] text-[#6B6B6B] mt-0.5 truncate">
                  {Object.values(cartItem.customizations).join(", ")}
                </p>
              )}
              <div className="flex items-center justify-between mt-2">
                <span className="text-primary text-[14px] font-semibold">
                  R$ {cartItem.totalPrice.toFixed(2).replace(".", ",")}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-[#252525] flex items-center justify-center text-foreground hover:bg-[#333] transition-colors border border-white/[0.06]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[14px] w-5 text-center text-foreground">{cartItem.quantity}</span>
                  <button
                    onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="fixed bottom-16 left-0 right-0 bg-[#0D0D0D]/95 backdrop-blur-xl border-t border-white/[0.06] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-lg mx-auto">
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-[14px]">
              <span className="text-[#6B6B6B]">Subtotal</span>
              <span className="text-foreground">R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[#6B6B6B]">Taxa de entrega</span>
              <span className={deliveryFee === 0 ? "text-success neon-success" : "text-foreground"}>
                {deliveryFee === 0 ? "Gratis" : `R$ ${deliveryFee.toFixed(2).replace(".", ",")}`}
              </span>
            </div>
            <div className="flex justify-between border-t border-white/[0.06] pt-2">
              <span className="text-foreground font-semibold">Total</span>
              <span className="text-primary font-semibold text-[16px]">
                R$ {(total + deliveryFee).toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
          >
            Finalizar Pedido
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
