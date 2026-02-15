import { filmDetailQueryOptions } from '@/hooks/rq/useFilmDetails';
import FilmDetailsPage from '@/pages/FilmDetailsPage';
import { createFileRoute } from '@tanstack/react-router';

type FilmSearchParams = {
  category?: string;
};

export const Route = createFileRoute('/film/$id')({
  validateSearch: (search: Record<string, unknown>): FilmSearchParams => ({
    category: (search.category as string) || undefined,
  }),
  loader: async ({ context, params }) => {
    const filmId = Number(params.id);
    await context.queryClient.ensureQueryData(filmDetailQueryOptions(filmId))
  },
  component: FilmDetailsPage,
});
