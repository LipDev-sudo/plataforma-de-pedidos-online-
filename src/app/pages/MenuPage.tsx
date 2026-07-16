import { Clock3, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { useCart } from "../context/CartContext";
import { categories, getItemsByCategory, menuItems } from "../data/menu-data";

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const [search, setSearch] = useState("");
  const { addItem } = useCart();

  const filteredItems =
    activeCategory === "all" ? menuItems : getItemsByCategory(activeCategory);
  const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");
  const searchedItems = normalizedSearch
    ? filteredItems.filter((item) =>
        `${item.name} ${item.description}`
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch),
      )
    : filteredItems;

  return (
    <div className="pb-10">
      <div className="px-4 pb-4 pt-6 sm:px-6 sm:pt-8">
        <h1>Cardápio do Forno da Vila</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Pizzas de fermentação natural, entradas, sobremesas e bebidas preparadas
          para acompanhar o pedido.
        </p>

        <label className="relative mt-5 block max-w-2xl">
          <span className="sr-only">Buscar no cardápio</span>
          <Search
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar no cardápio"
            className="min-h-12 w-full rounded-xl border border-border bg-white pl-12 pr-4 text-sm shadow-sm outline-none transition focus:border-primary"
          />
        </label>
      </div>

      <div className="border-y border-border bg-white px-4 sm:px-6">
        <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
          <button
            type="button"
            onClick={() => setSearchParams({})}
            aria-pressed={activeCategory === "all"}
            className={`min-h-11 whitespace-nowrap rounded-lg px-4 text-sm font-bold transition-colors ${
              activeCategory === "all"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            Tudo
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSearchParams({ category: category.id })}
              aria-pressed={activeCategory === category.id}
              className={`min-h-11 whitespace-nowrap rounded-lg px-4 text-sm font-bold transition-colors ${
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <section className="px-4 py-6 sm:px-6">
        <p className="mb-4 text-sm font-semibold text-muted-foreground">
          {searchedItems.length}{" "}
          {searchedItems.length === 1 ? "item encontrado" : "itens encontrados"}
        </p>

        {searchedItems.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {searchedItems.map((item) => (
              <article
                key={item.id}
                className="product-row flex overflow-hidden rounded-2xl border border-border bg-white shadow-[0_6px_22px_rgba(35,31,27,0.05)]"
              >
                <Link
                  to={`/item/${item.id}`}
                  className="w-28 shrink-0 overflow-hidden bg-secondary sm:w-36"
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="h-full min-h-36 w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col p-4">
                  <Link to={`/item/${item.id}`}>
                    <h2 className="text-base">{item.name}</h2>
                  </Link>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                    {item.prepTime}
                  </p>
                  <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                    <span className="text-sm font-extrabold">
                      {formatCurrency(item.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => addItem(item, 1, {}, 0)}
                      aria-label={`Adicionar ${item.name} ao carrinho`}
                      className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-primary text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                      <Plus className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-white px-5 py-14 text-center">
            <h2 className="text-lg">Nenhum item encontrado</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ajuste a busca ou escolha outra categoria.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
