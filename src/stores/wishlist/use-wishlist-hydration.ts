import { useEffect, useState } from 'react';
import { useWishlistStore } from './wishlist.store';

export function useWishlistHydration() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useWishlistStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    useWishlistStore.persist.rehydrate();

    return unsubscribe;
  }, []);

  return hasHydrated;
}