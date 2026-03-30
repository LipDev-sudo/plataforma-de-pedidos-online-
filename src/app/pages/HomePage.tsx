import { Link } from "react-router";
import { Search, Star, Clock, ChevronRight, MapPin, Flame } from "lucide-react";
import { categories, getFeaturedItems, menuItems } from "../data/menu-data";
import { useCart } from "../context/CartContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion } from "motion/react";

export function HomePage() {
  const featured = getFeaturedItems();
  const popular = menuItems.filter((i) => i.rating >= 4.7).slice(0, 6);
  const { addItem } = useCart();

  return (
    <div className="pb-24">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#150808] to-[#0D0D0D]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(234,29,44,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,212,126,0.05),transparent_50%)]" />
        <div className="relative px-4 pt-6 pb-8">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-1.5 text-[#6B6B6B] text-[12px] mb-0.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>Entregar em</span>
              </div>
              <p className="text-foreground text-[15px] font-medium">
                Rua das Flores, 123
                <ChevronRight className="w-4 h-4 inline ml-0.5 text-[#6B6B6B]" />
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#FF6B35] flex items-center justify-center text-white shadow-lg shadow-primary/25">
              <span className="text-[14px] font-bold">JM</span>
            </div>
          </div>

          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[28px] leading-tight mb-1 text-white">
              O que vamos <br />
              pedir <span className="text-gradient">hoje</span>?
            </h1>
            <p className="text-[#6B6B6B] text-[14px] mb-4">
              Descubra sabores incriveis perto de voce
            </p>
          </motion.div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#6B6B6B]" />
            <input
              type="text"
              placeholder="Buscar pratos, restaurantes..."
              className="w-full bg-[#1A1A1A] rounded-2xl pl-11 pr-4 py-3.5 text-[14px] text-foreground placeholder:text-[#6B6B6B] border border-white/[0.06] focus:border-primary/40 focus:outline-none focus:shadow-[0_0_12px_rgba(234,29,44,0.15)] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[18px] text-white">Categorias</h2>
          <Link to="/menu" className="text-primary text-[13px] flex items-center gap-0.5 hover:gap-1.5 transition-all">
            Ver todas <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                to={`/menu?category=${cat.id}`}
                className="flex flex-col items-center gap-1.5 min-w-[72px] group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] flex items-center justify-center text-2xl border border-white/[0.06] group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:shadow-[0_0_16px_rgba(234,29,44,0.15)] transition-all duration-300">
                  {cat.icon}
                </div>
                <span className="text-[11px] text-[#8A8A8A] group-hover:text-foreground transition-colors">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Banner */}
      <div className="px-4 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden h-44 border border-white/[0.06]"
        >
          <ImageWithFallback
            src={featured[0]?.image}
            alt="Destaque"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/90 via-[#0D0D0D]/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-[11px] px-3 py-1 rounded-full font-semibold shadow-lg shadow-primary/30 neon-border">
              <Flame className="w-3 h-3" />
              Destaque do dia
            </span>
            <h3 className="text-white mt-2 text-[18px] drop-shadow-lg">{featured[0]?.name}</h3>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-white/90 text-[15px] font-semibold">
                R$ {featured[0]?.price.toFixed(2).replace(".", ",")}
              </span>
              <Link
                to={`/item/${featured[0]?.id}`}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-[13px] px-5 py-2 rounded-full font-semibold transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50"
              >
                Pedir agora
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Items - Horizontal scroll */}
      <div className="px-4 mt-7">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[18px] text-white">Destaques</h2>
          <Link to="/menu" className="text-primary text-[13px] flex items-center gap-0.5 hover:gap-1.5 transition-all">
            Ver mais <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            >
              <Link
                to={`/item/${item.id}`}
                className="min-w-[180px] bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/[0.06] card-glow block"
              >
                <div className="h-28 overflow-hidden relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 to-transparent" />
                </div>
                <div className="p-3">
                  <h4 className="text-[13px] truncate text-foreground">{item.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                    <span className="text-[12px] text-accent font-medium">{item.rating}</span>
                    <span className="text-[12px] text-[#4A4A4A] mx-1">&middot;</span>
                    <Clock className="w-3 h-3 text-[#6B6B6B]" />
                    <span className="text-[11px] text-[#6B6B6B]">{item.prepTime}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-primary font-semibold text-[14px]">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addItem(item, 1, {}, 0);
                      }}
                      className="w-7 h-7 rounded-full bg-primary hover:bg-primary/80 text-primary-foreground flex items-center justify-center text-[18px] transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
                    >
                      +
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Items - Vertical list */}
      <div className="px-4 mt-7">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-5 h-5 text-primary drop-shadow-[0_0_6px_rgba(234,29,44,0.4)]" />
          <h2 className="text-[18px] text-white">Mais Pedidos</h2>
        </div>
        <div className="space-y-3">
          {popular.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
            >
              <Link
                to={`/item/${item.id}`}
                className="flex gap-3 bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/[0.06] p-3 card-glow block"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-white/[0.06]">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] truncate text-foreground">{item.name}</h4>
                  <p className="text-[12px] text-[#6B6B6B] line-clamp-2 mt-0.5">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-primary font-semibold">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      <span className="text-[12px] text-accent font-medium">{item.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
