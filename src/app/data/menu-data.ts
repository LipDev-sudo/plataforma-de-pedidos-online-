export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  prepTime: string;
  featured?: boolean;
  customizations?: Customization[];
}

export interface Customization {
  name: string;
  options: { label: string; price: number }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
}

export const categories: Category[] = [
  { id: "burgers", name: "Burgers", icon: "🍔", itemCount: 4 },
  { id: "pizzas", name: "Pizzas", icon: "🍕", itemCount: 3 },
  { id: "japonesa", name: "Japonesa", icon: "🍣", itemCount: 3 },
  { id: "aves", name: "Aves", icon: "🍗", itemCount: 3 },
  { id: "saladas", name: "Saladas", icon: "🥗", itemCount: 2 },
  { id: "massas", name: "Massas", icon: "🍝", itemCount: 3 },
  { id: "sobremesas", name: "Sobremesas", icon: "🍰", itemCount: 3 },
  { id: "bebidas", name: "Bebidas", icon: "🥤", itemCount: 4 },
];

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Smash Burger Duplo",
    description: "Dois smash de carne angus 120g, queijo cheddar derretido, bacon crocante, cebola caramelizada, picles e molho especial da casa no pão brioche artesanal.",
    price: 38.90,
    image: "https://images.unsplash.com/photo-1632898657999-ae6920976661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzI5NjE1Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "burgers",
    rating: 4.9,
    prepTime: "15-20 min",
    featured: true,
    customizations: [
      { name: "Ponto da Carne", options: [{ label: "Mal passado", price: 0 }, { label: "Ao ponto", price: 0 }, { label: "Bem passado", price: 0 }] },
      { name: "Extras", options: [{ label: "Bacon extra", price: 5 }, { label: "Queijo extra", price: 4 }, { label: "Ovo frito", price: 3 }] },
    ],
  },
  {
    id: "2",
    name: "Pizza Pepperoni Supreme",
    description: "Massa artesanal fermentada por 72h, molho de tomate San Marzano, mozzarella de búfala, pepperoni importado e orégano fresco.",
    price: 54.90,
    image: "https://images.unsplash.com/photo-1705537748124-926009973f94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzczMDA0MDU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "pizzas",
    rating: 4.8,
    prepTime: "25-30 min",
    featured: true,
    customizations: [
      { name: "Tamanho", options: [{ label: "Média (6 fatias)", price: 0 }, { label: "Grande (8 fatias)", price: 15 }, { label: "Família (12 fatias)", price: 28 }] },
      { name: "Borda", options: [{ label: "Tradicional", price: 0 }, { label: "Catupiry", price: 8 }, { label: "Cheddar", price: 8 }] },
    ],
  },
  {
    id: "3",
    name: "Combinado Sushi Premium",
    description: "20 peças selecionadas: salmão, atum, camarão e peixe branco. Acompanha gengibre, wasabi e molho shoyu artesanal.",
    price: 79.90,
    image: "https://images.unsplash.com/photo-1763647756796-af9230245bf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN1c2hpJTIwcGxhdHRlcnxlbnwxfHx8fDE3NzMwMjQxODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "japonesa",
    rating: 4.9,
    prepTime: "20-25 min",
    featured: true,
    customizations: [
      { name: "Quantidade", options: [{ label: "20 peças", price: 0 }, { label: "30 peças", price: 35 }, { label: "40 peças", price: 60 }] },
    ],
  },
  {
    id: "4",
    name: "Frango Grelhado Especial",
    description: "Peito de frango grelhado com ervas finas, acompanhado de arroz integral, legumes salteados e molho chimichurri.",
    price: 42.90,
    image: "https://images.unsplash.com/photo-1564636242997-77953084df48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHBsYXRlfGVufDF8fHx8MTc3Mjk2ODUyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "aves",
    rating: 4.7,
    prepTime: "20-25 min",
    customizations: [
      { name: "Acompanhamento", options: [{ label: "Arroz integral", price: 0 }, { label: "Purê de batata", price: 3 }, { label: "Batata frita", price: 5 }] },
    ],
  },
  {
    id: "5",
    name: "Caesar Salad Completa",
    description: "Mix de folhas frescas, croutons artesanais, lascas de parmesão, tomate cereja e molho caesar caseiro. Opção com frango grelhado.",
    price: 32.90,
    image: "https://images.unsplash.com/photo-1574926054530-540288c8e678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWVzYXIlMjBzYWxhZCUyMGJvd2x8ZW58MXx8fHwxNzczMDI2MTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "saladas",
    rating: 4.6,
    prepTime: "10-15 min",
    customizations: [
      { name: "Proteína", options: [{ label: "Sem proteína", price: 0 }, { label: "Frango grelhado", price: 8 }, { label: "Camarão", price: 15 }] },
    ],
  },
  {
    id: "6",
    name: "Carbonara Trufada",
    description: "Spaghetti al dente com molho carbonara clássico, guanciale crocante, gema curada e finalizado com azeite trufado e parmesão.",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1651949404339-9af9095d66dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYSUyMHBsYXRlfGVufDF8fHx8MTc3MzA1ODQyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "massas",
    rating: 4.8,
    prepTime: "18-22 min",
    featured: true,
    customizations: [
      { name: "Massa", options: [{ label: "Spaghetti", price: 0 }, { label: "Penne", price: 0 }, { label: "Fettuccine", price: 0 }] },
    ],
  },
  {
    id: "7",
    name: "Bolo de Chocolate Belga",
    description: "Fatia generosa de bolo com chocolate belga 70% cacau, ganache cremosa e calda de frutas vermelhas. Servido com sorvete de baunilha.",
    price: 28.90,
    image: "https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NzI5OTc3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "sobremesas",
    rating: 4.9,
    prepTime: "5-10 min",
    customizations: [
      { name: "Acompanhamento", options: [{ label: "Sorvete de baunilha", price: 0 }, { label: "Chantilly", price: 3 }, { label: "Calda extra", price: 2 }] },
    ],
  },
  {
    id: "8",
    name: "Smoothie Tropical",
    description: "Blend refrescante de manga, maracujá, banana e leite de coco. Opção com whey protein e granola.",
    price: 22.90,
    image: "https://images.unsplash.com/photo-1530894649581-58df9294379f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0JTIwc21vb3RoaWUlMjBkcmlua3xlbnwxfHx8fDE3NzMwNTg0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "bebidas",
    rating: 4.5,
    prepTime: "5-8 min",
    customizations: [
      { name: "Adicional", options: [{ label: "Sem adicional", price: 0 }, { label: "Whey protein", price: 6 }, { label: "Granola", price: 4 }] },
    ],
  },
  {
    id: "9",
    name: "Batata Frita Trufada",
    description: "Batatas fritas crocantes temperadas com sal trufado, parmesão ralado e ervas finas. Acompanha maionese de alho.",
    price: 26.90,
    image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllcyUyMGFwcGV0aXplcnxlbnwxfHx8fDE3NzMwNTg0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "burgers",
    rating: 4.7,
    prepTime: "10-12 min",
  },
  {
    id: "10",
    name: "Açaí Premium",
    description: "Açaí puro da Amazônia batido com banana, servido com granola, leite em pó, mel e frutas frescas da estação.",
    price: 29.90,
    image: "https://images.unsplash.com/photo-1598235494070-a291e5fea420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhJUMzJUE3YSVDMyVBRCUyMGJvd2wlMjBoZWFsdGh5JTIwZm9vZHxlbnwxfHx8fDE3NzMwNTg0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "sobremesas",
    rating: 4.8,
    prepTime: "5-8 min",
    featured: true,
    customizations: [
      { name: "Tamanho", options: [{ label: "300ml", price: 0 }, { label: "500ml", price: 10 }, { label: "700ml", price: 18 }] },
      { name: "Toppings", options: [{ label: "Padrão", price: 0 }, { label: "Morango extra", price: 5 }, { label: "Nutella", price: 7 }] },
    ],
  },
  {
    id: "11",
    name: "Tacos Mexicanos",
    description: "3 tacos crocantes com carne moída temperada, guacamole fresco, pico de gallo, creme azedo e queijo gratinado.",
    price: 36.90,
    image: "https://images.unsplash.com/photo-1707603571504-86c1ea50903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvcyUyMG1leGljYW4lMjBmb29kfGVufDF8fHx8MTc3MzA1MzEzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "burgers",
    rating: 4.6,
    prepTime: "15-20 min",
    customizations: [
      { name: "Proteína", options: [{ label: "Carne moída", price: 0 }, { label: "Frango desfiado", price: 0 }, { label: "Carnitas", price: 5 }] },
    ],
  },
  {
    id: "12",
    name: "Iced Latte Especial",
    description: "Café espresso duplo com leite gelado, xarope de baunilha artesanal e gelo. Servido em copo de 400ml.",
    price: 18.90,
    image: "https://images.unsplash.com/photo-1579888071069-c107a6f79d82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwbGF0dGUlMjBkcmlua3xlbnwxfHx8fDE3NzMwNTg0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "bebidas",
    rating: 4.7,
    prepTime: "3-5 min",
    customizations: [
      { name: "Leite", options: [{ label: "Integral", price: 0 }, { label: "Desnatado", price: 0 }, { label: "Vegetal (aveia)", price: 3 }] },
      { name: "Xarope", options: [{ label: "Baunilha", price: 0 }, { label: "Caramelo", price: 2 }, { label: "Avelã", price: 2 }] },
    ],
  },
];

export const getItemsByCategory = (categoryId: string) =>
  menuItems.filter((item) => item.category === categoryId);

export const getFeaturedItems = () =>
  menuItems.filter((item) => item.featured);

export const getItemById = (id: string) =>
  menuItems.find((item) => item.id === id);
