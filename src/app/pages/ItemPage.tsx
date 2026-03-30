import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Star, Clock, Minus, Plus, ShoppingCart } from "lucide-react";
import { getItemById } from "../data/menu-data";
import { useCart } from "../context/CartContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getItemById(id || "");
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [extraPrice, setExtraPrice] = useState(0);

  if (!item) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-[#6B6B6B]">Item nao encontrado</p>
      </div>
    );
  }

  const handleOptionSelect = (custName: string, optLabel: string, optPrice: number) => {
    const prev = selectedOptions[custName];
    const prevPrice = item.customizations
      ?.find((c) => c.name === custName)
      ?.options.find((o) => o.label === prev)?.price || 0;

    setSelectedOptions((s) => ({ ...s, [custName]: optLabel }));
    setExtraPrice((p) => p - prevPrice + optPrice);
  };

  const totalPrice = (item.price + extraPrice) * quantity;

  const handleAddToCart = () => {
    addItem(item, quantity, selectedOptions, extraPrice);
    navigate("/cart");
  };

  return (
    <div className="pb-28">
      {/* Image Header */}
      <div className="relative h-72">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/20 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#0D0D0D]/70 backdrop-blur-sm flex items-center justify-center border border-white/[0.1]"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 -mt-6 relative">
        <div className="bg-[#1A1A1A] rounded-2xl shadow-lg p-4 border border-white/[0.06]">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-white">{item.name}</h1>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-[14px] text-[#8A8A8A]">{item.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#6B6B6B]" />
                  <span className="text-[14px] text-[#8A8A8A]">{item.prepTime}</span>
                </div>
              </div>
            </div>
            <span className="text-primary text-[22px] font-semibold">
              R$ {item.price.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <p className="text-[14px] text-[#8A8A8A] mt-3 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Customizations */}
        {item.customizations && item.customizations.length > 0 && (
          <div className="mt-4 space-y-4">
            {item.customizations.map((cust) => (
              <div key={cust.name} className="bg-[#1A1A1A] rounded-2xl p-4 border border-white/[0.06]">
                <h3 className="mb-3 text-foreground">{cust.name}</h3>
                <div className="space-y-2">
                  {cust.options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleOptionSelect(cust.name, opt.label, opt.price)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                        selectedOptions[cust.name] === opt.label
                          ? "bg-primary/10 border-2 border-primary shadow-[0_0_12px_rgba(234,29,44,0.1)]"
                          : "bg-[#252525] border-2 border-transparent hover:border-white/[0.1]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedOptions[cust.name] === opt.label
                              ? "border-primary"
                              : "border-[#4A4A4A]"
                          }`}
                        >
                          {selectedOptions[cust.name] === opt.label && (
                            <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_6px_rgba(234,29,44,0.5)]" />
                          )}
                        </div>
                        <span className="text-[14px] text-foreground">{opt.label}</span>
                      </div>
                      {opt.price > 0 && (
                        <span className="text-[13px] text-primary">
                          + R$ {opt.price.toFixed(2).replace(".", ",")}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quantity */}
        <div className="mt-4 bg-[#1A1A1A] rounded-2xl p-4 border border-white/[0.06]">
          <h3 className="mb-3 text-foreground">Quantidade</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-xl bg-[#252525] flex items-center justify-center text-foreground border border-white/[0.06] hover:bg-[#333] transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-[20px] w-8 text-center text-foreground">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/25"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D]/95 backdrop-blur-xl border-t border-white/[0.06] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Adicionar ao carrinho</span>
            <span className="bg-white/20 px-3 py-0.5 rounded-full text-[14px]">
              R$ {totalPrice.toFixed(2).replace(".", ",")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
