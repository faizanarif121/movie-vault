import { WishlistPage } from '@/pages/WishlistPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/wishlist/')({
  component: WishlistPage,
});
