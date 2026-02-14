import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import Header from '@/components/Header'

interface RouterContext {
  queryClient: QueryClient
  head: string
}

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
  component: RootLayout,
})

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="layout">
        <Header />
        <main className="layout__main">
          <Outlet /> {/* Start rendering router matches */}
        </main>
        <TanStackRouterDevtools position="bottom-right" />
      </body>
    </html>
  )
}