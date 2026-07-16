import {
  ArrowLeft,
  Banknote,
  CheckCircle2,
  CreditCard,
  MapPin,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useCart, type Order } from "../context/CartContext";

const paymentMethods = [
  { id: "pix", label: "Pix", icon: Smartphone, description: "Pagamento instantâneo" },
  {
    id: "credit",
    label: "Cartão de crédito",
    icon: CreditCard,
    description: "Visa, Mastercard ou Elo",
  },
  {
    id: "debit",
    label: "Cartão de débito",
    icon: CreditCard,
    description: "Pagamento na entrega",
  },
  {
    id: "cash",
    label: "Dinheiro",
    icon: Banknote,
    description: "Troco na entrega",
  },
];

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, placeOrder } = useCart();
  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [payment, setPayment] = useState("pix");
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [addressError, setAddressError] = useState("");

  const subtotal = getTotal();
  const deliveryFee = subtotal > 80 ? 0 : 8.9;
  const total = subtotal + deliveryFee;

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
      paymentMethod:
        paymentMethods.find((method) => method.id === payment)?.label ?? payment,
      deliveryFee,
    });
    setConfirmedOrder(order);
    setAddressError("");
  };

  if (confirmedOrder) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-success/10 text-success">
          <CheckCircle2 className="h-11 w-11" strokeWidth={1.7} aria-hidden="true" />
        </div>
        <p className="mt-5 text-sm font-bold text-success">Pedido recebido</p>
        <h1 className="mt-1">Pedido confirmado</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          O pedido {confirmedOrder.id} entrou na fila demonstrativa do Forno da Vila.
        </p>
        <p className="mt-4 text-xl font-extrabold text-primary">
          {formatCurrency(confirmedOrder.total)}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white"
          >
            Acompanhar pedido
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="min-h-11 rounded-xl border border-border bg-white px-5 text-sm font-bold"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-36">
      <div className="flex items-center gap-3 px-4 pb-4 pt-6 sm:px-6 sm:pt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border bg-white"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <div>
          <h1>Finalizar pedido</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Nenhum pagamento real será processado.
          </p>
        </div>
      </div>

      <div className="grid gap-5 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" strokeWidth={1.75} aria-hidden="true" />
              <h2 className="text-lg">Endereço de entrega</h2>
            </div>
            <label className="mt-4 block text-sm font-bold" htmlFor="address">
              Rua e número
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
                if (addressError) setAddressError("");
              }}
              placeholder="Rua e número"
              aria-invalid={Boolean(addressError)}
              aria-describedby={addressError ? "address-error" : undefined}
              className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
            />
            <label className="mt-4 block text-sm font-bold" htmlFor="complement">
              Complemento <span className="font-normal text-muted-foreground">(opcional)</span>
            </label>
            <input
              id="complement"
              type="text"
              value={complement}
              onChange={(event) => setComplement(event.target.value)}
              placeholder="Apartamento, bloco ou referência"
              className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
            />
            {addressError && (
              <p id="address-error" role="alert" className="mt-2 text-sm font-semibold text-destructive">
                {addressError}
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-border bg-white p-5">
            <h2 className="text-lg">Forma de pagamento</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {paymentMethods.map((method) => {
                const selected = payment === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPayment(method.id)}
                    aria-pressed={selected}
                    className={`flex min-h-16 items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                      selected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/45"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        selected ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <method.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{method.label}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {method.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-lg">Resumo do pedido</h2>
          <div className="mt-4 space-y-3">
            {items.map((cartItem) => (
              <div key={cartItem.cartId} className="flex justify-between gap-3 text-sm">
                <span className="line-clamp-1 text-muted-foreground">
                  {cartItem.quantity}× {cartItem.item.name}
                </span>
                <span className="shrink-0 font-semibold">
                  {formatCurrency(cartItem.totalPrice)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Entrega</span>
              <span className={deliveryFee === 0 ? "font-bold text-success" : ""}>
                {deliveryFee === 0 ? "Grátis" : formatCurrency(deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-extrabold">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-border bg-white/98 p-4 backdrop-blur-md lg:bottom-0">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={handleOrder}
            className="min-h-12 w-full rounded-xl bg-primary px-5 text-sm font-bold text-white transition-colors hover:bg-[#a93622]"
          >
            Confirmar pedido · {formatCurrency(total)}
          </button>
        </div>
      </div>
    </div>
  );
}
