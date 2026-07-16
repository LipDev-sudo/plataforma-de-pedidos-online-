import {
  Bike,
  CakeSlice,
  ChevronRight,
  Clock3,
  CupSoda,
  MapPin,
  Pizza,
  Plus,
  Search,
  ShoppingBag,
  Wheat,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import {
  categories,
  getFeaturedItems,
  menuItems,
  type Category,
  type MenuItem,
} from "../data/menu-data";
import { ImageWithFallback } from "../components/ImageWithFallback";

const categoryIcons = {
  pizzas: Pizza,
  entradas: Wheat,
  sobremesas: CakeSlice,
  bebidas: CupSoda,
};

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function CategoryLink({ category }: { category: Category }) {
  const Icon = categoryIcons[category.id];

  return (
    <Link
      to={`/menu?category=${category.id}`}
      className="group flex min-w-[76px] flex-col items-center gap-2 border-b-2 border-transparent px-2 py-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary sm:min-w-[112px] sm:flex-row sm:justify-center"
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      {category.name}
    </Link>
  );
}

function MenuRow({
  item,
  onAdd,
}: {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}) {
  return (
    <article className="product-row flex gap-3 border-b border-border py-4 last:border-b-0 sm:gap-5">
      <Link
        to={`/item/${item.id}`}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-28 sm:w-40"
      >
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link to={`/item/${item.id}`} className="min-w-0">
            <h3 className="text-sm sm:text-base">{item.name}</h3>
          </Link>
          <p className="shrink-0 text-sm font-bold">{formatCurrency(item.price)}</p>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {item.description}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
            <Clock3 className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            {item.prepTime}
          </span>
          <button
            type="button"
            onClick={() => onAdd(item)}
            aria-label={`Adicionar ${item.name} ao carrinho`}
            className="flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-xl border border-primary px-3 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function OrderSummary() {
  const { items, getItemCount, getTotal } = useCart();
  const count = getItemCount();
  const total = getTotal();

  return (
    <aside className="sticky top-24 rounded-2xl border border-border bg-white p-5 shadow-[0_12px_36px_rgba(35,31,27,0.07)]">
      <div className="flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-primary" strokeWidth={1.75} aria-hidden="true" />
        <h2 className="text-lg">Seu pedido</h2>
      </div>

      {items.length === 0 ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Adicione itens para montar seu pedido no Forno da Vila.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {items.slice(0, 3).map((cartItem) => (
            <div key={cartItem.cartId} className="flex justify-between gap-3 text-sm">
              <span className="line-clamp-1 text-muted-foreground">
                {cartItem.quantity}× {cartItem.item.name}
              </span>
              <span className="shrink-0 font-semibold">
                {formatCurrency(cartItem.totalPrice)}
              </span>
            </div>
          ))}
          {items.length > 3 && (
            <p className="text-xs text-muted-foreground">
              Mais {items.length - 3} {items.length - 3 === 1 ? "item" : "itens"}
            </p>
          )}
        </div>
      )}

      <div className="mt-5 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {count} {count === 1 ? "item" : "itens"}
          </span>
          <span className="text-lg font-extrabold">{formatCurrency(total)}</span>
        </div>
        <Link
          to="/cart"
          className="mt-4 flex min-h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-white transition-colors hover:bg-[#a93622]"
        >
          Ver carrinho
        </Link>
      </div>

      <div className="mt-5 space-y-3 border-t border-border pt-4 text-xs text-muted-foreground">
        <p className="flex items-start gap-2">
          <Bike className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          Entrega simulada ou retirada no balcão.
        </p>
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          Endereço informado apenas no checkout.
        </p>
      </div>
    </aside>
  );
}

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCart();
  const featured = getFeaturedItems();
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase("pt-BR");
  const visibleItems = normalizedQuery
    ? menuItems.filter((item) =>
      [item.name, item.description, item.category]
        .join(" ")
        .toLocaleLowerCase("pt-BR")
        .includes(normalizedQuery),
    )
    : featured;

  const handleAdd = (item: MenuItem) => addItem(item, 1, {}, 0);

  return (
    <div className="pb-8 lg:pb-12">
      <section className="p-4 sm:p-6">
        <div className="relative min-h-[224px] overflow-hidden rounded-2xl bg-[#241e19] sm:min-h-[280px]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1800&q=88"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/48 to-black/10" />
          <div className="relative flex min-h-[224px] max-w-xl flex-col justify-end p-5 text-white sm:min-h-[280px] sm:p-8">
            <p className="text-sm font-semibold text-white/80">Pizzaria artesanal de bairro</p>
            <h1 className="mt-1 text-[2rem] text-white sm:text-[2.75rem]">Forno da Vila</h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
              Massa de fermentação natural, ingredientes selecionados e forno a lenha.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6" aria-label="Busca e categorias">
        <label className="relative block">
          <span className="sr-only">Buscar no cardápio</span>
          <Search
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Buscar pizzas, entradas e bebidas"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="min-h-12 w-full rounded-xl border border-border bg-white pl-12 pr-4 text-sm shadow-sm outline-none transition focus:border-primary"
          />
        </label>

        <div className="mt-3 flex overflow-x-auto border-b border-border scrollbar-hide">
          {categories.map((category) => (
            <CategoryLink key={category.id} category={category} />
          ))}
        </div>
      </section>

      <div className="grid gap-8 px-4 pt-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
            <div>
              <h2>{normalizedQuery ? "Resultados" : "Pizzas artesanais"}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {normalizedQuery
                  ? `${visibleItems.length} ${visibleItems.length === 1 ? "item encontrado" : "itens encontrados"}`
                  : "Feitas com massa de fermentação natural e assadas no forno a lenha."}
              </p>
            </div>
            {!normalizedQuery && (
              <Link
                to="/menu?category=pizzas"
                className="hidden shrink-0 items-center gap-1 text-sm font-bold text-primary sm:flex"
              >
                Ver todas
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>

          {visibleItems.length > 0 ? (
            <div>
              {visibleItems.map((item) => (
                <MenuRow key={item.id} item={item} onAdd={handleAdd} />
              ))}
            </div>
          ) : (
            <div className="py-14 text-center">
              <Pizza className="mx-auto h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="mt-3">Nenhum item encontrado</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Tente buscar por margherita, focaccia, sobremesa ou bebida.
              </p>
            </div>
          )}

          {!normalizedQuery && (
            <Link
              to="/menu?category=pizzas"
              className="mt-4 flex min-h-11 w-full items-center justify-center gap-1 rounded-xl border border-border bg-white text-sm font-bold text-foreground sm:hidden"
            >
              Ver mais pizzas
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </section>

        <div className="hidden lg:block">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
