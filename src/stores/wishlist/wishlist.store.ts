import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Film, FilmDetail } from '@/types/film.types';

export type WishlistFilm = Film | FilmDetail;

interface WishlistState {
  items: WishlistFilm[];
  addToWishlist: (film: WishlistFilm) => void;
  removeFromWishlist: (filmId: number) => void;
  isInWishlist: (filmId: number) => boolean;
  toggleWishlist: (film: WishlistFilm) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (film) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === film.id);
          return exists ? state : { items: [...state.items, film] };
        }),

      removeFromWishlist: (filmId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== filmId),
        })),

      isInWishlist: (filmId) => 
        get().items.some((item) => item.id === filmId),

      toggleWishlist: (film) => {
        const state = get();
        const exists = state.items.some((item) => item.id === film.id);
        
        if (exists) {
          state.removeFromWishlist(film.id);
        } else {
          state.addToWishlist(film);
        }
      },
    }),
    {
      name: 'movie-vault-wishlist',
      skipHydration: true,
    }
  )
);