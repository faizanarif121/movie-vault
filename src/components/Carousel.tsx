import type { Film } from '@/types/film.types';
import FilmCard from './FilmCard';
import type { CategorySlug } from '@/constants';

interface CarouselProps {
  title: string;
  films: Film[];
  category: CategorySlug;
}

const Carousel = ({ title, films, category }: CarouselProps) => {
  return (
    <section className={`carousel carousel--${category || 'default'}`}>
      <div className="carousel__header">
        <h2 className="carousel__title">{title}</h2>
      </div>
      <div className="carousel__track">
        {films.map((film) => (
          <div className="carousel__item" key={film.id}>
            <FilmCard film={film} category={category} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Carousel