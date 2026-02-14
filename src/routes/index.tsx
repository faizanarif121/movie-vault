import { createFileRoute } from '@tanstack/react-router'
import { homeFilmsQueryOptions } from '../hooks/rq/useHomeFilms';
import { HomePage } from '../pages/HomePage';

export const Route = createFileRoute('/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(homeFilmsQueryOptions()),
  component: HomePage,
})