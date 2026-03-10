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
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10 text-primary" />
        </div>
        <h2 className="mb-2">Carrinho vazio</h2>
        <p className="text-muted-foreground text-center text-[14px] mb-6">
          Adicione itens deliciosos do nosso cardápio!
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl flex items-center gap-2"
        >
          Ver cardápio <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="pb-48">
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <h1>Carrinho</h1>
          <button
            onClick={clearCart}
            className="text-destructive text-[13px] flex items-center gap-1"
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
            className="bg-card rounded-2xl border border-border p-3 flex gap-3"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={cartItem.item.image}
                alt={cartItem.item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h4 className="text-[14px] truncate pr-2">{cartItem.item.name}</h4>
                <button
                  onClick={() => removeItem(cartItem.cartId)}
                  className="text-muted-foreground p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {Object.entries(cartItem.customizations).length > 0 && (
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                  {Object.values(cartItem.customizations).join(", ")}
                </p>
              )}
              <div className="flex items-center justify-between mt-2">
                <span className="text-primary text-[14px]">
                  R$ {cartItem.totalPrice.toFixed(2).replace(".", ",")}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-input-background flex items-center justify-center"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[14px] w-5 text-center">{cartItem.quantity}</span>
                  <button
                    onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"
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
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-lg mx-auto">
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-[14px]">
              <span className="text-muted-foreground">Subtotal</span>
              <span>R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-muted-foreground">Taxa de entrega</span>
              <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                {deliveryFee === 0 ? "Grátis" : `R$ ${deliveryFee.toFixed(2).replace(".", ",")}`}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span>Total</span>
              <span className="text-primary">
                R$ {(total + deliveryFee).toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
          >
            Finalizar Pedido
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
