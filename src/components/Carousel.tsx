import type { Film } from '@/types/film.types';
import {imageService} from '../services/image.service';
import { Link } from '@tanstack/react-router';

interface CarouselProps {
  title: string;
  films: Film[];
}

const Carousel = ({ title, films }: CarouselProps) => {
  return (
    <div key={title}>
      <h2>{title}</h2>
      <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', overflowX: 'scroll'}}>
        {films.map((film) => (
          <Link to='/film/$id' params={{id: String(film.id)}} key={film.id}>
            {film.poster_path && (
              <img
                src={imageService.getPosterUrl(film.poster_path, 'w342')}
                alt={film.title}
                fetchPriority="low"
              />
            )}
            <p>{film.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Carousel