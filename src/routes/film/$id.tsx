import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/film/$id')({
  component: FilmDetails,
})

function FilmDetails() {
  const { id } = Route.useParams();
  return <div>Hello from FilmDetails with id {id}!</div>
}
