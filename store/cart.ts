import { create } from "zustand";
import { Product, CartItem } from "@/lib/types";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addItem: (product: Product, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity }];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return { items: newItems, totalItems, totalPrice };
    });
  },

  removeItem: (productId: string) => {
    set((state) => {
      const newItems = state.items.filter(
        (item) => item.product.id !== productId
      );
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return { items: newItems, totalItems, totalPrice };
    });
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => {
      if (quantity <= 0) {
        return get().removeItem(productId), state;
      }

      const newItems = state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return { items: newItems, totalItems, totalPrice };
    });
  },

  clearCart: () => {
    set({ items: [], totalItems: 0, totalPrice: 0 });
  },
}));
