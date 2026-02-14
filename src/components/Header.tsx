import { useWishlistStore, useWishlistHydration } from '@/stores/wishlist';
import { Link } from '@tanstack/react-router';

const Header = () => {
  const hasHydrated = useWishlistHydration();
  const items = useWishlistStore((state) => state.items);
  const displayCount = hasHydrated ? items.length : 0;
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          Movie Vault
        </Link>
        <nav className="header__nav">
          <Link to="/" className="header__link">
            Home
          </Link>
          <Link to="/wishlist" className="header__link header__link--wishlist">
            Wishlist
            {displayCount > 0 && (
              <span className="header__badge">{displayCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;