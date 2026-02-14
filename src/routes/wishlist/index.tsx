import { WishlistPage } from '@/pages/WishlistPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/wishlist/')({
  component: WishlistPage,
});
