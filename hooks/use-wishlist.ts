import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';

interface WishList {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useWishList = create(
  persist<WishList>((set, get) => ({
  items: [],
  addItem: (data: Product) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item.id === data.id);
    
    if (existingItem) {
      return toast('Item already in wishlist.');
    }

    set({ items: [...get().items, data] });
    toast.success('Item saved to wishlist.');
  },
  removeItem: (id: string) => {
    set({ items: [...get().items.filter((item) => item.id !== id)] });
    toast.success('Item removed from wishlist.');
  },
  removeAll: () => set({ items: [] }),
}), {
  name: 'wishlist-storage',
  storage: createJSONStorage(() => localStorage)
}));

export default useWishList;