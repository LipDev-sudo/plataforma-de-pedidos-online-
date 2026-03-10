import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const paymentMethods = [
  { id: "pix", label: "Pix", icon: Smartphone, desc: "Pagamento instantâneo" },
  { id: "credit", label: "Cartão de Crédito", icon: CreditCard, desc: "Visa, Master, Elo" },
  { id: "debit", label: "Cartão de Débito", icon: CreditCard, desc: "Visa, Master" },
  { id: "cash", label: "Dinheiro", icon: Banknote, desc: "Troco na entrega" },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, placeOrder } = useCart();
  const [address, setAddress] = useState("Rua das Flores, 123");
  const [complement, setComplement] = useState("");
  const [payment, setPayment] = useState("pix");
  const [showSuccess, setShowSuccess] = useState(false);

  const total = getTotal();
  const deliveryFee = total > 80 ? 0 : 8.9;
  const finalTotal = total + deliveryFee;

  if (items.length === 0 && !showSuccess) {
    navigate("/cart");
    return null;
  }

  const handleOrder = () => {
    placeOrder(address + (complement ? `, ${complement}` : ""));
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="mb-2">Pedido Confirmado!</h1>
        <p className="text-muted-foreground text-[14px] mb-2">
          Seu pedido está sendo preparado e chegará em breve.
        </p>
        <p className="text-primary mb-6">
          Total: R$ {finalTotal.toFixed(2).replace(".", ",")}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="bg-primary text-primary-foreground px-5 py-3 rounded-2xl"
          >
            Ver Pedidos
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-input-background text-foreground px-5 py-3 rounded-2xl"
          >
            Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-input-background flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1>Checkout</h1>
      </div>

      {/* Delivery Address */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-primary" />
            <h3>Endereço de Entrega</h3>
          </div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Rua, número"
            className="w-full bg-input-background rounded-xl px-4 py-3 text-[14px] mb-2"
          />
          <input
            type="text"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
            placeholder="Complemento (opcional)"
            className="w-full bg-input-background rounded-xl px-4 py-3 text-[14px]"
          />
        </div>
      </div>

      {/* Payment */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="mb-3">Forma de Pagamento</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPayment(method.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  payment === method.id
                    ? "bg-secondary border-2 border-primary"
                    : "bg-input-background border-2 border-transparent"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    payment === method.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <method.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[14px]">{method.label}</p>
                  <p className="text-[12px] text-muted-foreground">{method.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="mb-3">Resumo do Pedido</h3>
          <div className="space-y-2">
            {items.map((ci) => (
              <div key={ci.cartId} className="flex justify-between text-[14px]">
                <span className="text-muted-foreground">
                  {ci.quantity}x {ci.item.name}
                </span>
                <span>R$ {ci.totalPrice.toFixed(2).replace(".", ",")}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-3 pt-3 space-y-1.5">
            <div className="flex justify-between text-[14px]">
              <span className="text-muted-foreground">Subtotal</span>
              <span>R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-muted-foreground">Entrega</span>
              <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                {deliveryFee === 0
                  ? "Grátis"
                  : `R$ ${deliveryFee.toFixed(2).replace(".", ",")}`}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 mt-2">
              <span>Total</span>
              <span className="text-primary text-[18px]">
                R$ {finalTotal.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleOrder}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
          >
            Confirmar Pedido - R$ {finalTotal.toFixed(2).replace(".", ",")}
          </button>
        </div>
      </div>
    </div>
  );
}
