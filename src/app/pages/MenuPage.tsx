import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { Star, Clock, Search } from "lucide-react";
import { categories, menuItems, getItemsByCategory } from "../data/menu-data";
import { useCart } from "../context/CartContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function MenuPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filteredItems =
    activeCategory === "all" ? menuItems : getItemsByCategory(activeCategory);

  const searchedItems = search
    ? filteredItems.filter(
        (i) =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.description.toLowerCase().includes(search.toLowerCase())
      )
    : filteredItems;

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="mb-4">Cardápio</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar no cardápio..."
            className="w-full bg-input-background rounded-xl pl-10 pr-4 py-3 text-[14px] placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-[13px] whitespace-nowrap transition-colors ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground border border-border"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-[13px] whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground border border-border"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="px-4">
        <p className="text-[13px] text-muted-foreground mb-3">
          {searchedItems.length} {searchedItems.length === 1 ? "item encontrado" : "itens encontrados"}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {searchedItems.map((item) => (
            <Link
              key={item.id}
              to={`/item/${item.id}`}
              className="bg-card rounded-2xl shadow-sm overflow-hidden border border-border"
            >
              <div className="h-28 overflow-hidden relative">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.featured && (
                  <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <div className="p-2.5">
                <h4 className="text-[13px] truncate">{item.name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-[11px] text-muted-foreground">{item.rating}</span>
                  <span className="text-[11px] text-muted-foreground mx-0.5">·</span>
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground">{item.prepTime}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary text-[14px]">
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addItem(item, 1, {}, 0);
                    }}
                    className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[16px]"
                  >
                    +
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
