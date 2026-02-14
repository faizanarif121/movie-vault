import type { CategorySlug } from '@/constants';
import { imageService } from '@/services/image.service';
import { useWishlistStore, useWishlistHydration } from '@/stores/wishlist';
import { getCategoryByGenreIds } from '@/utils/category.utils';
import { Link } from '@tanstack/react-router';

export function WishlistPage() {
  const hasHydrated = useWishlistHydration();
  const { items, removeFromWishlist } = useWishlistStore();
  const displayItems = hasHydrated ? items : [];

  if (displayItems.length === 0) {
    return (
      <div className="wishlist wishlist--empty">
        <h1 className="wishlist__title">Your Wishlist</h1>
        <p className="wishlist__empty-text">
          Your wishlist is empty. Browse films and add some!
        </p>
        <Link to="/" className="btn btn--action">
          Browse Films
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <h1 className="wishlist__title">Your Wishlist</h1>
      <p className="wishlist__count">{displayItems.length} film{displayItems.length !== 1 ? 's' : ''}</p>
      <div className="wishlist__grid">
        {displayItems.map((film) => {
          const category: CategorySlug = getCategoryByGenreIds(film.genre_ids || []);
          return (
            <div key={film.id} className={`wish-card theme--${category}`}>
              <Link
                to="/film/$id"
                params={{ id: String(film.id) }}
                search={{ category }}
                className="wish-card__link"
              >
                <img
                  src={imageService.getPosterUrl(film.poster_path, 'w342')}
                  alt={film.title}
                  className="wish-card__image"
                  loading="lazy"
                />
              </Link>
              <div className="wish-card__body">
                <h3 className="wish-card__title">{film.title}</h3>
                <p className="wish-card__year">
                  {film.release_date ? new Date(film.release_date).getFullYear() : 'N/A'}
                </p>
                <div className="wish-card__action">
                  <button
                    className={`btn btn--${category} btn--small`}
                    onClick={() => removeFromWishlist(film.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
