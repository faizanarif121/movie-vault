import type { CategorySlug } from '@/constants';
import { imageService } from '@/services/image.service';
import type { Film } from '@/types/film.types';
import { Link } from '@tanstack/react-router';

interface FilmCardProps {
  film: Film;
  category: CategorySlug;
}

const FilmCard = ({ film, category }: FilmCardProps) => {
  return (
    <Link
      to="/film/$id"
      params={{ id: String(film.id) }}
      search={{ category }}
      className={`film-card film-card--${category}`}
    >
      <div className="film-card__poster">
        <img
          src={imageService.getPosterUrl(film.poster_path, 'w342')}
          alt={film.title}
          className="film-card__image"
          loading="lazy"
        />
        <div className="film-card__overlay">
          <span className="film-card__rating">
            {film.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="film-card__body">
        <h3 className="film-card__title">{film.title}</h3>
        <p className="film-card__year">
          {film.release_date ? new Date(film.release_date).getFullYear() : 'N/A'}
        </p>
      </div>
    </Link>
  );
}


export default FilmCard;