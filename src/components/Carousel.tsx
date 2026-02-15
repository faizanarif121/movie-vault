import type { Film } from '@/types/film.types';
import FilmCard from './FilmCard';
import type { CategorySlug } from '@/constants';
import { useRef, useState, useCallback } from 'react';

interface CarouselProps {
  title: string;
  films: Film[];
  category: CategorySlug;
}

const Carousel = ({ title, films, category }: CarouselProps) => {

  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  if (!films.length) return null;

  return (
    <section className={`carousel carousel--${category || 'default'}`}>
      <div className="carousel__header">
        <h2 className="carousel__title">{title}</h2>
        <div className="carousel__controls">
          <button
            className="carousel__btn carousel__btn--prev"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            &#8249;
          </button>
          <button
            className="carousel__btn carousel__btn--next"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            &#8250;
          </button>
        </div>
      </div>
      <div
        className="carousel__track"
        ref={trackRef}
        onScroll={updateScrollState}
      >
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