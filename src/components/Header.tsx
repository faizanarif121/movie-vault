import { Link } from '@tanstack/react-router';

export function Header() {

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
            {0}
          </Link>
        </nav>
      </div>
    </header>
  );
}
