import { filmDetailQueryOptions } from '@/hooks/rq/useFilmDetails';
import FilmDetailsPage from '@/pages/FilmDetailsPage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/film/$id')({
  loader: async ({ context, params }) => {
    const { id } = params;
    if (!id) throw new Error('Film ID is required');
    context.queryClient.ensureQueryData(filmDetailQueryOptions(Number(id)))
  },
  component: FilmDetailsPage,
})
