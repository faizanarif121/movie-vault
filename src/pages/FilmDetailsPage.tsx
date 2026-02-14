import { Route } from '../routes/film/$id';
import { useFilmDetail } from '@/hooks/rq/useFilmDetails';
import { useSimilarFilms } from '@/hooks/rq/useSimilarFilms';
import Carousel from '@/components/Carousel';

const FilmDetailsPage = () => {
  const { id } = Route.useParams();
  const filmId = Number(id);

  const { data: film } = useFilmDetail(filmId);
  const { data: similar } = useSimilarFilms(filmId);

  return (
    <div>
      <h1>{film.title}</h1>
      <div >
        {similar.length > 0 && (
          <Carousel title="Similar Films" films={similar} />
        )}
      </div>
    </div>
  );
}

export default FilmDetailsPage;