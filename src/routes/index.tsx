import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Film,
})

function Film() {
  return <div className="p-2">Hello from Film!</div>
}