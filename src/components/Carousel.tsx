import type { CategorySlug } from '@/constants';
import type { Film } from '@/types/film.types';
import {imageService} from '../services/image.service';

interface CarouselProps {
  title: string;
  films: Film[];
  category: CategorySlug;
}

const Carousel = ({ title, films, category }: CarouselProps) => {
  return (
    <div key={category}>
      <h2>{title}</h2>
      <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', overflowX: 'scroll'}}>
        {films.map((film) => (
          <div key={film.id}>
            {film.poster_path && (
              <img
                src={imageService.getPosterUrl(film.poster_path, 'w342')}
                alt={film.title}
                fetchPriority="low"
              />
            )}
            <p>{film.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel