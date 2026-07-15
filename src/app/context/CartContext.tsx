import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
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
  deliveryFee: number;
  date: string;
  status: "preparando" | "a caminho" | "entregue";
  address: string;
  paymentMethod: string;
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
  placeOrder: (details: {
    address: string;
    paymentMethod: string;
    deliveryFee: number;
  }) => Order;
  advanceOrderStatus: (orderId: string) => void;
  repeatOrder: (orderId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "lipdev-pedidos-cart";
const ORDERS_STORAGE_KEY = "lipdev-pedidos-orders-v2";

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

function loadOrders(): Order[] {
  const stored = loadFromStorage<Partial<Order>[]>(ORDERS_STORAGE_KEY, []);
  if (!Array.isArray(stored)) return [];

  return stored.flatMap((order) => {
    if (!order.id || !Array.isArray(order.items) || !order.status || !order.address) {
      return [];
    }
    return [{
      ...order,
      total: Number(order.total) || 0,
      deliveryFee: Number(order.deliveryFee) || 0,
      paymentMethod: order.paymentMethod || "Não informado",
    } as Order];
  });
}

function loadCart(): CartItem[] {
  const stored = loadFromStorage<unknown>(CART_STORAGE_KEY, []);
  return Array.isArray(stored) ? (stored as CartItem[]) : [];
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [orders, setOrders] = useState<Order[]>(loadOrders);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

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

  const placeOrder = useCallback((details: {
    address: string;
    paymentMethod: string;
    deliveryFee: number;
  }) => {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const order: Order = {
      id: `ORD-${Date.now().toString().slice(-7)}`,
      items: [...items],
      total: subtotal + details.deliveryFee,
      deliveryFee: details.deliveryFee,
      date: new Date().toLocaleString("pt-BR"),
      status: "preparando",
      address: details.address,
      paymentMethod: details.paymentMethod,
    };
    setOrders((prev) => [order, ...prev]);
    setItems([]);
    return order;
  }, [items]);

  const advanceOrderStatus = useCallback((orderId: string) => {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== orderId) return order;
        if (order.status === "preparando") return { ...order, status: "a caminho" };
        if (order.status === "a caminho") return { ...order, status: "entregue" };
        return order;
      }),
    );
  }, []);

  const repeatOrder = useCallback((orderId: string) => {
    const order = orders.find((candidate) => candidate.id === orderId);
    if (!order) return;
    const timestamp = Date.now();
    setItems(
      order.items.map((cartItem, index) => ({
        ...cartItem,
        cartId: `${cartItem.item.id}-${timestamp}-${index}`,
      })),
    );
  }, [orders]);

  return (
    <CartContext.Provider
      value={{
        items,
        orders,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
        placeOrder,
        advanceOrderStatus,
        repeatOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// The context and hook stay together so consumers share a single public module.
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
