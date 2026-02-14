import Carousel from "../components/Carousel";
import { useHomeFilms } from "../hooks/rq/useHomeFilms";

export function HomePage() {
  const { data } = useHomeFilms();

  return (
    <div  style={{padding: 10}}>
      <section>
        <h1>Discover Films</h1>
        <p>Browse by category and find your next favourite film</p>
      </section>
      <div>
        {data.map(({ category, films }) => (
          <Carousel
            key={category.slug}
            title={category.name}
            films={films}
          />
        ))}
      </div>
    </div>
  );
}