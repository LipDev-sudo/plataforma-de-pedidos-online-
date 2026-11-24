// Configuração do restaurante. Para implantar para um cliente, edite este arquivo
// e o cardápio em src/app/data/menu-data.ts. Veja "Implantação para um cliente" no README.

export type FormaPagamento = "pix" | "credit" | "debit" | "cash";

export interface ConfigRestaurante {
  /** true mostra os avisos de demonstração e a simulação de entrega; false para um cliente. */
  demonstracao: boolean;
  /** Nome do restaurante: aparece no cabeçalho, nas páginas e no título. */
  nome: string;
  chamada: string;
  descricao: string;
  /** Imagem de capa da página inicial (URL ou caminho a partir de public/). */
  capa: string;
  /** WhatsApp que recebe os pedidos, só com dígitos, com 55 e DDD. Vazio abre o WhatsApp sem número. */
  whatsapp: string;
  /** Cor principal em hexadecimal. */
  cor: string;
  /** Hover da cor principal. */
  corEscura: string;
  /** Mostra o selo "Desenvolvido por Achse" no rodapé. */
  selo: boolean;
  entrega: { taxa: number; gratisAcimaDe: number | null };
  pagamentos: { id: FormaPagamento; label: string; description: string }[];
  seo: { titulo: string; descricao: string; url: string; imagem?: string };
  rodape: { texto: string; links: { rotulo: string; href: string }[] };
}

export const restaurante: ConfigRestaurante = {
  demonstracao: true,
  nome: "Forno da Vila",
  chamada: "Pizzaria artesanal de bairro",
  descricao: "Massa de fermentação natural, ingredientes selecionados e forno a lenha.",
  capa: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1800&q=88",
  whatsapp: "",
  cor: "#A3132A",
  corEscura: "#7F0F21",
  selo: true,
  entrega: { taxa: 8.9, gratisAcimaDe: 80 },
  pagamentos: [
    { id: "pix", label: "Pix", description: "Pagamento instantâneo" },
    { id: "credit", label: "Cartão de crédito", description: "Visa, Mastercard ou Elo" },
    { id: "debit", label: "Cartão de débito", description: "Pagamento na entrega" },
    { id: "cash", label: "Dinheiro", description: "Troco na entrega" },
  ],
  seo: {
    titulo: "Forno da Vila | Cardápio com pedido pelo WhatsApp",
    descricao:
      "Demonstração Achse de cardápio digital: carrinho, opções por item, taxa de entrega e pedido enviado direto ao WhatsApp do restaurante, sem comissão.",
    url: "https://plataforma-de-pedidos-online-two.vercel.app/",
  },
  rodape: {
    texto: "Demonstração com restaurante fictício. Nenhum pedido ou pagamento real é processado.",
    links: [{ rotulo: "Quero um cardápio assim", href: "https://achse.onrender.com/contato" }],
  },
};

export const taxaDeEntrega = (subtotal: number) =>
  restaurante.entrega.gratisAcimaDe !== null && subtotal > restaurante.entrega.gratisAcimaDe ? 0 : restaurante.entrega.taxa;
