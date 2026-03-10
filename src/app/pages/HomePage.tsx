import { Link } from "react-router";
import { Search, Star, Clock, ChevronRight, MapPin } from "lucide-react";
import { categories, getFeaturedItems, menuItems } from "../data/menu-data";
import { useCart } from "../context/CartContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function HomePage() {
  const featured = getFeaturedItems();
  const popular = menuItems.filter((i) => i.rating >= 4.7).slice(0, 6);
  const { addItem } = useCart();

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-primary px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1 text-primary-foreground/70 text-[13px] mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Entregar em</span>
            </div>
            <p className="text-primary-foreground">Rua das Flores, 123</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
            <span className="text-[18px]">JM</span>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar pratos, restaurantes..."
            className="w-full bg-white rounded-xl pl-10 pr-4 py-3 text-[14px] placeholder:text-muted-foreground shadow-sm"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2>Categorias</h2>
          <Link to="/menu" className="text-primary text-[14px] flex items-center gap-0.5">
            Ver todas <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              to={`/menu?category=${cat.id}`}
              className="flex flex-col items-center gap-1.5 min-w-[72px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-2xl shadow-sm">
                {cat.icon}
              </div>
              <span className="text-[12px] text-foreground/80">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Banner */}
      <div className="px-4 mt-6">
        <div className="relative rounded-2xl overflow-hidden h-40">
          <ImageWithFallback
            src={featured[0]?.image}
            alt="Destaque"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="bg-primary text-primary-foreground text-[11px] px-2.5 py-1 rounded-full">
              Destaque do dia
            </span>
            <h3 className="text-white mt-2">{featured[0]?.name}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-white/90 text-[14px]">
                R$ {featured[0]?.price.toFixed(2).replace(".", ",")}
              </span>
              <Link
                to={`/item/${featured[0]?.id}`}
                className="bg-primary text-primary-foreground text-[13px] px-4 py-1.5 rounded-full"
              >
                Pedir agora
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Items */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2>Destaques</h2>
          <Link to="/menu" className="text-primary text-[14px] flex items-center gap-0.5">
            Ver mais <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {featured.map((item) => (
            <Link
              key={item.id}
              to={`/item/${item.id}`}
              className="min-w-[200px] bg-card rounded-2xl shadow-sm overflow-hidden border border-border"
            >
              <div className="h-32 overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h4 className="text-[14px] truncate">{item.name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-[12px] text-muted-foreground">{item.rating}</span>
                  <span className="text-[12px] text-muted-foreground mx-1">·</span>
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[12px] text-muted-foreground">{item.prepTime}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary">
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addItem(item, 1, {}, 0);
                    }}
                    className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[18px]"
                  >
                    +
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Items */}
      <div className="px-4 mt-6">
        <h2 className="mb-3">Mais Pedidos</h2>
        <div className="space-y-3">
          {popular.map((item) => (
            <Link
              key={item.id}
              to={`/item/${item.id}`}
              className="flex gap-3 bg-card rounded-2xl shadow-sm overflow-hidden border border-border p-3"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] truncate">{item.name}</h4>
                <p className="text-[12px] text-muted-foreground line-clamp-2 mt-0.5">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary">
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-[12px] text-muted-foreground">{item.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
