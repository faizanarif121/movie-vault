import Carousel from "../components/Carousel";
import { useHomeFilms } from "../hooks/rq/useHomeFilms";

export function HomePage() {
  const { data } = useHomeFilms();

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__title">Discover Films</h1>
        <p className="home__subtitle">Browse by category and find your next favourite film</p>
      </section>
      <div className="home__carousels">
        {data.map(({ category, films }) => (
          <Carousel
            key={category.slug}
            title={category.name}
            category={category.slug}
            films={films}
          />
        ))}
      </div>
    </div>
  );
}