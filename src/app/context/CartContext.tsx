import React, { createContext, useContext, useState, useCallback } from "react";
import type { MenuItem } from "../data/menu-data";

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customizations: Record<string, string>;
  totalPrice: number;
  cartId: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "preparando" | "a caminho" | "entregue";
  address: string;
}

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  addItem: (item: MenuItem, quantity: number, customizations: Record<string, string>, extraPrice: number) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  placeOrder: (address: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-2024001",
      items: [],
      total: 89.70,
      date: "08/03/2026 - 19:45",
      status: "entregue",
      address: "Rua das Flores, 123",
    },
    {
      id: "ORD-2024002",
      items: [],
      total: 134.60,
      date: "07/03/2026 - 20:30",
      status: "entregue",
      address: "Av. Paulista, 1000",
    },
  ]);

  const addItem = useCallback((item: MenuItem, quantity: number, customizations: Record<string, string>, extraPrice: number) => {
    const cartId = `${item.id}-${Date.now()}`;
    const totalPrice = (item.price + extraPrice) * quantity;
    setItems((prev) => [...prev, { item, quantity, customizations, totalPrice, cartId }]);
  }, []);

  const removeItem = useCallback((cartId: string) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.cartId !== cartId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.cartId === cartId
          ? { ...i, quantity, totalPrice: (i.totalPrice / i.quantity) * quantity }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getTotal = useCallback(() => items.reduce((sum, i) => sum + i.totalPrice, 0), [items]);

  const getItemCount = useCallback(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const placeOrder = useCallback((address: string) => {
    const order: Order = {
      id: `ORD-${Date.now().toString().slice(-7)}`,
      items: [...items],
      total: items.reduce((sum, i) => sum + i.totalPrice, 0),
      date: new Date().toLocaleString("pt-BR"),
      status: "preparando",
      address,
    };
    setOrders((prev) => [order, ...prev]);
    setItems([]);
  }, [items]);

  return (
    <CartContext.Provider value={{ items, orders, addItem, removeItem, updateQuantity, clearCart, getTotal, getItemCount, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
