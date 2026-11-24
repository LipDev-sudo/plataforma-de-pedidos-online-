import type { Order } from "../context/CartContext";

const moeda = (valor: number) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Texto do pedido enviado ao WhatsApp do restaurante. */
export function mensagemDoPedido(order: Order, nomeRestaurante: string): string {
  const itens = order.items.map((ci) => {
    const extras = Object.values(ci.customizations).filter(Boolean);
    return `${ci.quantity}× ${ci.item.name}${extras.length ? ` (${extras.join(", ")})` : ""} · ${moeda(ci.totalPrice)}`;
  });
  return [
    `Olá, ${nomeRestaurante}! Quero fazer o pedido ${order.id}:`,
    "",
    ...itens,
    "",
    `Entrega: ${order.deliveryFee === 0 ? "grátis" : moeda(order.deliveryFee)}`,
    `Total: ${moeda(order.total)}`,
    `Pagamento: ${order.paymentMethod}`,
    `Endereço: ${order.address}`,
  ].join("\n");
}

export const linkWhatsApp = (numero: string, mensagem: string) =>
  `https://wa.me/${numero.replace(/\D/g, "")}?text=${encodeURIComponent(mensagem)}`;
