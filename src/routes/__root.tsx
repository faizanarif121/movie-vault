import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
  <>
    <div>
      <Link to="/">
        Home
      </Link>{' '}
      <Link to="/film/$id" params={{ id: '123' }}>
        Movie
      </Link>
      <Link to="/wishlist">
        Wishlist
      </Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout })