import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wishlist/')({
  component: Wishlist,
})

function Wishlist() {
  return <div className="p-2">Hello from Wishlist!</div>
}