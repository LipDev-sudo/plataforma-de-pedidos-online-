import { ArrowLeft, Clock3, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { useCart } from "../context/CartContext";
import { getItemById } from "../data/menu-data";

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

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
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1>Item não encontrado</h1>
        <button
          type="button"
          onClick={() => navigate("/menu")}
          className="mt-5 min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white"
        >
          Voltar ao cardápio
        </button>
      </div>
    );
  }

  const handleOptionSelect = (
    customizationName: string,
    optionLabel: string,
    optionPrice: number,
  ) => {
    const previousLabel = selectedOptions[customizationName];
    const previousPrice =
      item.customizations
        ?.find((customization) => customization.name === customizationName)
        ?.options.find((option) => option.label === previousLabel)?.price || 0;

    setSelectedOptions((current) => ({
      ...current,
      [customizationName]: optionLabel,
    }));
    setExtraPrice((current) => current - previousPrice + optionPrice);
  };

  const totalPrice = (item.price + extraPrice) * quantity;

  const handleAddToCart = () => {
    addItem(item, quantity, selectedOptions, extraPrice);
    navigate("/cart");
  };

  return (
    <div className="pb-32 lg:pb-28">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Voltar"
        className="m-4 flex min-h-11 items-center gap-2 rounded-xl border border-border bg-white px-4 text-sm font-bold shadow-sm sm:mx-6 sm:mt-6"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Voltar
      </button>

      <div className="grid gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            className="aspect-[4/3] h-full max-h-[560px] w-full object-cover"
          />
        </div>

        <section>
          <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_8px_30px_rgba(35,31,27,0.05)] sm:p-6">
            <p className="text-sm font-bold text-primary">Forno da Vila</p>
            <div className="mt-2 flex items-start justify-between gap-4">
              <h1>{item.name}</h1>
              <span className="shrink-0 text-xl font-extrabold">
                {formatCurrency(item.price)}
              </span>
            </div>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {item.description}
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Clock3 className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              Preparo estimado em {item.prepTime}
            </p>
          </div>

          {item.customizations && item.customizations.length > 0 && (
            <div className="mt-4 space-y-4">
              {item.customizations.map((customization) => (
                <fieldset
                  key={customization.name}
                  className="rounded-2xl border border-border bg-white p-5"
                >
                  <legend className="px-1 text-base font-bold">
                    {customization.name}
                  </legend>
                  <div className="mt-2 space-y-2">
                    {customization.options.map((option) => {
                      const selected =
                        selectedOptions[customization.name] === option.label;
                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() =>
                            handleOptionSelect(
                              customization.name,
                              option.label,
                              option.price,
                            )
                          }
                          aria-pressed={selected}
                          className={`flex min-h-12 w-full items-center justify-between rounded-xl border px-4 text-left text-sm transition-colors ${
                            selected
                              ? "border-primary bg-primary/5"
                              : "border-border bg-background hover:border-primary/45"
                          }`}
                        >
                          <span className="flex items-center gap-3 font-semibold">
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                selected ? "border-primary" : "border-[#9b9289]"
                              }`}
                              aria-hidden="true"
                            >
                              {selected && (
                                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                              )}
                            </span>
                            {option.label}
                          </span>
                          {option.price > 0 && (
                            <span className="font-bold text-primary">
                              + {formatCurrency(option.price)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-white p-5">
            <h2 className="text-base">Quantidade</h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                aria-label="Diminuir quantidade"
                className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border bg-background hover:border-primary"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="w-6 text-center text-lg font-bold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                aria-label="Aumentar quantidade"
                className="flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-primary text-white"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-border bg-white/96 p-3 backdrop-blur-md lg:bottom-0">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 text-sm font-bold text-white transition-colors hover:bg-[#a93622]"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            Adicionar ao carrinho
            <span className="border-l border-white/35 pl-3">
              {formatCurrency(totalPrice)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
