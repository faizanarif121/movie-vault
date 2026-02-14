import type { CategorySlug } from '@/constants';
import { Route } from '../routes/film/$id';
import { useFilmDetail } from '@/hooks/rq/useFilmDetails';
import { imageService } from '@/services/image.service';
import { useWishlistStore, useWishlistHydration } from '@/stores/wishlist';
import { getCategoryByGenreIds } from '@/utils/category.utils';

const FilmDetailsPage = () => {
  const { id } = Route.useParams();
  const filmId = Number(id);

  const { data: film } = useFilmDetail(filmId);

  const hasHydrated = useWishlistHydration();
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const category: CategorySlug = getCategoryByGenreIds(film.genres.map((g) => g.id));

  const inWishlist = hasHydrated && isInWishlist(film.id);

  return (
    <div className={`film-detail theme--${category}`}>
      {film.backdrop_path && (
        <div
          className="film-detail__backdrop"
          style={{ backgroundImage: `url(${imageService.getBackdropUrl(film.backdrop_path)})` }}
        />
      )}

      <div className="film-detail__content">
        <div className="film-detail__top">
          <div className="film-detail__poster">
            <img
              src={imageService.getPosterUrl(film.poster_path, 'w342')}
              alt={film.title}
              className="film-detail__image"
              fetchPriority="high"
              width={300}
              height={450}
            />
          </div>

          <div className="film-detail__info">
            <h1 className="film-detail__title">{film.title}</h1>
            {film.tagline && (
              <p className="film-detail__tagline">{film.tagline}</p>
            )}

            <div className="film-detail__meta">
              <span className="film-detail__rating">
                {film.vote_average.toFixed(1)} / 10
              </span>
              <span className="film-detail__year">
                {film.release_date ? new Date(film.release_date).getFullYear() : 'N/A'}
              </span>
              {film.runtime && (
                <span className="film-detail__runtime">{film.runtime} min</span>
              )}
            </div>

            <div className="film-detail__genres">
              {film.genres.map((g) => (
                <span key={g.id} className="film-detail__tag">
                  {g.name}
                </span>
              ))}
            </div>

            <p className="film-detail__overview">{film.overview}</p>
            <button
              className={`btn btn--${category} ${inWishlist ? 'btn--active' : ''}`}
              onClick={() => toggleWishlist(film)}
            >
              {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>

        <div className="film-detail__section">
          <h2 className="film-detail__heading">Additional Information</h2>
          <div className="detail-grid">
            <div className="detail-grid__item">
              <span className="detail-grid__label">Status</span>
              <span className="detail-grid__value">{film.status}</span>
            </div>
            <div className="detail-grid__item">
              <span className="detail-grid__label">Original Language</span>
              <span className="detail-grid__value">
                {film.spoken_languages?.[0]?.english_name || film.original_language}
              </span>
            </div>
            {film.budget > 0 && (
              <div className="detail-grid__item">
                <span className="detail-grid__label">Budget</span>
                <span className="detail-grid__value">
                  ${film.budget.toLocaleString()}
                </span>
              </div>
            )}
            {film.revenue > 0 && (
              <div className="detail-grid__item">
                <span className="detail-grid__label">Revenue</span>
                <span className="detail-grid__value">
                  ${film.revenue.toLocaleString()}
                </span>
              </div>
            )}
            {film.production_companies.length > 0 && (
              <div className="detail-grid__item detail-grid__item--full">
                <span className="detail-grid__label">Production</span>
                <span className="detail-grid__value">
                  {film.production_companies.map((c) => c.name).join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmDetailsPage;