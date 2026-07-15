import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { useCart, type Order } from "../context/CartContext";

const paymentMethods = [
  { id: "pix", label: "Pix", icon: Smartphone, desc: "Pagamento instantaneo" },
  { id: "credit", label: "Cartao de Credito", icon: CreditCard, desc: "Visa, Master, Elo" },
  { id: "debit", label: "Cartao de Debito", icon: CreditCard, desc: "Visa, Master" },
  { id: "cash", label: "Dinheiro", icon: Banknote, desc: "Troco na entrega" },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, placeOrder } = useCart();
  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [payment, setPayment] = useState("pix");
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [addressError, setAddressError] = useState("");

  const total = getTotal();
  const deliveryFee = total > 80 ? 0 : 8.9;
  const finalTotal = total + deliveryFee;

  if (items.length === 0 && !confirmedOrder) {
    return <Navigate to="/cart" replace />;
  }

  const handleOrder = () => {
    if (address.trim().length < 8) {
      setAddressError("Informe rua e número para continuar.");
      return;
    }
    const order = placeOrder({
      address: address.trim() + (complement.trim() ? `, ${complement.trim()}` : ""),
      paymentMethod: paymentMethods.find((method) => method.id === payment)?.label ?? payment,
      deliveryFee,
    });
    setConfirmedOrder(order);
    setAddressError("");
  };

  if (confirmedOrder) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4 border border-success/20">
          <CheckCircle2 className="w-12 h-12 text-success drop-shadow-[0_0_10px_rgba(0,212,126,0.5)]" />
        </div>
        <h1 className="mb-2 text-white">Pedido Confirmado!</h1>
        <p className="text-[#9A9A9A] text-[14px] mb-2">
          O pedido {confirmedOrder.id} entrou na fila de preparo.
        </p>
        <p className="text-primary text-[18px] font-semibold mb-6">
          Total: R$ {confirmedOrder.total.toFixed(2).replace(".", ",")}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="bg-primary text-primary-foreground px-5 py-3 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
          >
            Ver Pedidos
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-[#1A1A1A] text-foreground px-5 py-3 rounded-2xl border border-white/[0.06] hover:bg-[#252525] transition-colors"
          >
            Inicio
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
          aria-label="Voltar"
          className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-white/[0.06] hover:bg-[#252525] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-white">Checkout</h1>
      </div>

      {/* Delivery Address */}
      <div className="px-4 mb-4">
        <div className="bg-[#1A1A1A] rounded-2xl border border-white/[0.06] p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-primary drop-shadow-[0_0_6px_rgba(234,29,44,0.4)]" />
            <h3 className="text-foreground">Endereco de Entrega</h3>
          </div>
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (addressError) setAddressError("");
            }}
            placeholder="Rua e número"
            aria-invalid={Boolean(addressError)}
            aria-describedby={addressError ? "address-error" : undefined}
            className="w-full bg-[#252525] rounded-xl px-4 py-3 text-[14px] text-foreground mb-2 border border-white/[0.06] focus:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all"
          />
          <input
            type="text"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
            placeholder="Complemento (opcional)"
            className="w-full bg-[#252525] rounded-xl px-4 py-3 text-[14px] text-foreground border border-white/[0.06] focus:border-primary/40 focus:outline-none transition-all"
          />
          {addressError && (
            <p id="address-error" role="alert" className="mt-2 text-[12px] text-red-400">
              {addressError}
            </p>
          )}
        </div>
      </div>

      {/* Payment */}
      <div className="px-4 mb-4">
        <div className="bg-[#1A1A1A] rounded-2xl border border-white/[0.06] p-4">
          <h3 className="mb-3 text-foreground">Forma de Pagamento</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPayment(method.id)}
                aria-pressed={payment === method.id}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  payment === method.id
                    ? "bg-primary/10 border-2 border-primary shadow-[0_0_12px_rgba(234,29,44,0.1)]"
                    : "bg-[#252525] border-2 border-transparent hover:border-white/[0.1]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    payment === method.id ? "bg-primary text-white shadow-lg shadow-primary/25" : "bg-[#333] text-[#9A9A9A]"
                  }`}
                >
                  <method.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[14px] text-foreground">{method.label}</p>
                  <p className="text-[12px] text-[#9A9A9A]">{method.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="px-4 mb-4">
        <div className="bg-[#1A1A1A] rounded-2xl border border-white/[0.06] p-4">
          <h3 className="mb-3 text-foreground">Resumo do Pedido</h3>
          <div className="space-y-2">
            {items.map((ci) => (
              <div key={ci.cartId} className="flex justify-between text-[14px]">
                <span className="text-[#9A9A9A]">
                  {ci.quantity}x {ci.item.name}
                </span>
                <span className="text-foreground">R$ {ci.totalPrice.toFixed(2).replace(".", ",")}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.06] mt-3 pt-3 space-y-1.5">
            <div className="flex justify-between text-[14px]">
              <span className="text-[#9A9A9A]">Subtotal</span>
              <span className="text-foreground">R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[#9A9A9A]">Entrega</span>
              <span className={deliveryFee === 0 ? "text-success neon-success" : "text-foreground"}>
                {deliveryFee === 0
                  ? "Gratis"
                  : `R$ ${deliveryFee.toFixed(2).replace(".", ",")}`}
              </span>
            </div>
            <div className="flex justify-between border-t border-white/[0.06] pt-2 mt-2">
              <span className="text-foreground font-semibold">Total</span>
              <span className="text-primary text-[18px] font-semibold">
                R$ {finalTotal.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-16 left-0 right-0 bg-[#0D0D0D]/95 backdrop-blur-xl border-t border-white/[0.06] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handleOrder}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
          >
            Confirmar Pedido - R$ {finalTotal.toFixed(2).replace(".", ",")}
          </button>
        </div>
      </div>
    </div>
  );
}
