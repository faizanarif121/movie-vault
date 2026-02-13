import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import type { RouterContext } from '../routerContext'

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    links: [{ rel: 'icon', href: '/images/favicon.ico' }],
    meta: [
      {
        title: 'Movie Vault App to show off movies and add them to a wishlist',
      },
      {
        charSet: 'UTF-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
    ],
    scripts: [
      ...(!import.meta.env.PROD
        ? [
            {
              type: 'module',
              children: `import RefreshRuntime from "/@react-refresh"
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true`,
            },
            {
              type: 'module',
              src: '/@vite/client',
            },
          ]
        : []),
      {
        type: 'module',
        src: import.meta.env.PROD
          ? '/static/entry-client.js'
          : '/src/entry-client.tsx',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
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
        </div>
        <hr />
        <Outlet /> {/* Start rendering router matches */}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}