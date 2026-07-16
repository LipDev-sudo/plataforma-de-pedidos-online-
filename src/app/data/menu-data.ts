export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "pizzas" | "entradas" | "sobremesas" | "bebidas";
  prepTime: string;
  featured?: boolean;
  customizations?: Customization[];
}

export interface Customization {
  name: string;
  options: { label: string; price: number }[];
}

export interface Category {
  id: MenuItem["category"];
  name: string;
  itemCount: number;
}

export const categories: Category[] = [
  { id: "pizzas", name: "Pizzas", itemCount: 6 },
  { id: "entradas", name: "Entradas", itemCount: 2 },
  { id: "sobremesas", name: "Sobremesas", itemCount: 2 },
  { id: "bebidas", name: "Bebidas", itemCount: 2 },
];

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;

export const menuItems: MenuItem[] = [
  {
    id: "margherita-da-vila",
    name: "Margherita da Vila",
    description:
      "Molho de tomate italiano, muçarela fior di latte, manjericão fresco e azeite extravirgem.",
    price: 54.9,
    image: image("photo-1574071318508-1cdbab80d002"),
    category: "pizzas",
    prepTime: "25–35 min",
    featured: true,
    customizations: [
      {
        name: "Tamanho",
        options: [
          { label: "Média · 6 fatias", price: 0 },
          { label: "Grande · 8 fatias", price: 14 },
        ],
      },
      {
        name: "Borda",
        options: [
          { label: "Tradicional", price: 0 },
          { label: "Recheada com catupiry", price: 9 },
        ],
      },
    ],
  },
  {
    id: "calabresa-artesanal",
    name: "Calabresa Artesanal",
    description:
      "Molho de tomate italiano, muçarela, calabresa artesanal, cebola roxa e orégano.",
    price: 56.9,
    image: image("photo-1565299624946-b28f40a0ae38"),
    category: "pizzas",
    prepTime: "25–35 min",
    featured: true,
    customizations: [
      {
        name: "Tamanho",
        options: [
          { label: "Média · 6 fatias", price: 0 },
          { label: "Grande · 8 fatias", price: 14 },
        ],
      },
      {
        name: "Finalização",
        options: [
          { label: "Cebola roxa", price: 0 },
          { label: "Sem cebola", price: 0 },
          { label: "Pimenta da casa", price: 2 },
        ],
      },
    ],
  },
  {
    id: "quatro-queijos",
    name: "Quatro Queijos",
    description:
      "Muçarela, gorgonzola, parmesão e provolone, finalizada com azeite de oliva.",
    price: 59.9,
    image: image("photo-1594007654729-407eedc4be65"),
    category: "pizzas",
    prepTime: "25–35 min",
    featured: true,
    customizations: [
      {
        name: "Tamanho",
        options: [
          { label: "Média · 6 fatias", price: 0 },
          { label: "Grande · 8 fatias", price: 14 },
        ],
      },
    ],
  },
  {
    id: "rucula-tomate-seco",
    name: "Rúcula com Tomate Seco",
    description:
      "Muçarela, rúcula fresca, tomate seco, parmesão e azeite de oliva.",
    price: 57.9,
    image: image("photo-1579751626657-72bc17010498"),
    category: "pizzas",
    prepTime: "25–35 min",
    featured: true,
    customizations: [
      {
        name: "Tamanho",
        options: [
          { label: "Média · 6 fatias", price: 0 },
          { label: "Grande · 8 fatias", price: 14 },
        ],
      },
    ],
  },
  {
    id: "cogumelos-taleggio",
    name: "Cogumelos e Taleggio",
    description:
      "Cogumelos salteados, queijo taleggio, muçarela e tomilho fresco.",
    price: 62.9,
    image: image("photo-1548365328-8b849e6f5a3f"),
    category: "pizzas",
    prepTime: "30–40 min",
    customizations: [
      {
        name: "Tamanho",
        options: [
          { label: "Média · 6 fatias", price: 0 },
          { label: "Grande · 8 fatias", price: 15 },
        ],
      },
    ],
  },
  {
    id: "pepperoni-picante",
    name: "Pepperoni Picante",
    description:
      "Molho de tomate, muçarela, pepperoni, mel picante e manjericão.",
    price: 61.9,
    image: image("photo-1628840042765-356cda07504e"),
    category: "pizzas",
    prepTime: "25–35 min",
    customizations: [
      {
        name: "Tamanho",
        options: [
          { label: "Média · 6 fatias", price: 0 },
          { label: "Grande · 8 fatias", price: 14 },
        ],
      },
      {
        name: "Picância",
        options: [
          { label: "Suave", price: 0 },
          { label: "Picante", price: 0 },
        ],
      },
    ],
  },
  {
    id: "focaccia-alecrim",
    name: "Focaccia de Alecrim",
    description:
      "Massa de fermentação natural, alecrim, flor de sal e azeite extravirgem.",
    price: 24.9,
    image: image("photo-1593280405106-e438ebe93f5b"),
    category: "entradas",
    prepTime: "12–18 min",
    customizations: [
      {
        name: "Acompanhamento",
        options: [
          { label: "Azeite da casa", price: 0 },
          { label: "Burrata cremosa", price: 14 },
        ],
      },
    ],
  },
  {
    id: "burrata-tomates",
    name: "Burrata com Tomates",
    description:
      "Burrata fresca, tomates assados, pesto de manjericão e pão da casa.",
    price: 38.9,
    image: image("photo-1546549032-9571cd6b27df"),
    category: "entradas",
    prepTime: "10–15 min",
  },
  {
    id: "tiramisu-da-casa",
    name: "Tiramisù da Casa",
    description:
      "Mascarpone, café, cacau e biscoito artesanal em montagem leve.",
    price: 23.9,
    image: image("photo-1571877227200-a0d98ea607e9"),
    category: "sobremesas",
    prepTime: "5–8 min",
  },
  {
    id: "panna-cotta",
    name: "Panna Cotta",
    description:
      "Creme de baunilha com calda de frutas vermelhas preparada na casa.",
    price: 21.9,
    image: image("photo-1488477181946-6428a0291777"),
    category: "sobremesas",
    prepTime: "5–8 min",
  },
  {
    id: "soda-italiana",
    name: "Soda Italiana",
    description: "Limão-siciliano, água com gás e xarope artesanal.",
    price: 13.9,
    image: image("photo-1513558161293-cdaf765ed2fd"),
    category: "bebidas",
    prepTime: "3–5 min",
  },
  {
    id: "cha-mate-casa",
    name: "Chá-mate da Casa",
    description: "Mate gelado, limão e pouco açúcar. Garrafa de 500 ml.",
    price: 10.9,
    image: image("photo-1556679343-c7306c1976bc"),
    category: "bebidas",
    prepTime: "3–5 min",
  },
];

export const getFeaturedItems = () =>
  menuItems.filter((item) => item.featured);

export const getItemsByCategory = (categoryId: string) =>
  menuItems.filter((item) => item.category === categoryId);

export const getItemById = (id: string) =>
  menuItems.find((item) => item.id === id);
