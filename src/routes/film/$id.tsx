import { filmDetailQueryOptions } from '@/hooks/rq/useFilmDetails';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/film/$id')({
  loader: async ({ context, params }) => {
    const { id } = params;
    if (!id) throw new Error('Film ID is required');
    const data = await context.queryClient.ensureQueryData(filmDetailQueryOptions(Number(id)));
    return { data };
  },
  component: FilmDetails,
})

function FilmDetails() {
  const { data } = Route.useLoaderData()
  return <div>Hello from FilmDetails with id {data.title}!</div>
}
