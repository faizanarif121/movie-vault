import { filmDetailQueryOptions } from '@/hooks/rq/useFilmDetails';
import { similarFilmsQueryOptions } from '@/hooks/rq/useSimilarFilms';
import FilmDetailsPage from '@/pages/FilmDetailsPage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/film/$id')({
  loader: async ({ context, params }) => {
    const { id } = params;
    if (!id) throw new Error('Film ID is required');
    await Promise.allSettled([
      context.queryClient.ensureQueryData(filmDetailQueryOptions(Number(id))),
      context.queryClient.ensureQueryData(similarFilmsQueryOptions(Number(id))), // This is not necessary for ssr 
    ]);
  },
  component: FilmDetailsPage,
})
