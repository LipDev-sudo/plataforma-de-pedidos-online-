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
        <p className="text-muted-foreground">Item não encontrado</p>
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 -mt-6 relative">
        <div className="bg-card rounded-2xl shadow-lg p-4 border border-border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1>{item.name}</h1>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-[14px] text-muted-foreground">{item.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[14px] text-muted-foreground">{item.prepTime}</span>
                </div>
              </div>
            </div>
            <span className="text-primary text-[22px]">
              R$ {item.price.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <p className="text-[14px] text-muted-foreground mt-3 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Customizations */}
        {item.customizations && item.customizations.length > 0 && (
          <div className="mt-4 space-y-4">
            {item.customizations.map((cust) => (
              <div key={cust.name} className="bg-card rounded-2xl p-4 border border-border">
                <h3 className="mb-3">{cust.name}</h3>
                <div className="space-y-2">
                  {cust.options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleOptionSelect(cust.name, opt.label, opt.price)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                        selectedOptions[cust.name] === opt.label
                          ? "bg-secondary border-2 border-primary"
                          : "bg-input-background border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedOptions[cust.name] === opt.label
                              ? "border-primary"
                              : "border-muted-foreground/30"
                          }`}
                        >
                          {selectedOptions[cust.name] === opt.label && (
                            <div className="w-3 h-3 rounded-full bg-primary" />
                          )}
                        </div>
                        <span className="text-[14px]">{opt.label}</span>
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
        <div className="mt-4 bg-card rounded-2xl p-4 border border-border">
          <h3 className="mb-3">Quantidade</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-xl bg-input-background flex items-center justify-center"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-[20px] w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg"
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
