import { pipeline } from 'node:stream/promises';
import {
  RouterServer,
  createRequestHandler,
  renderRouterToStream,
} from '@tanstack/react-router/ssr/server';
import { createRouter } from './router';
import type express from 'express';

export async function render({
  req,
  res,
  cssAssets = [],
  clientEntryScript,
}: {
  req: express.Request;
  res: express.Response;
  cssAssets?: string[];
  clientEntryScript: string;
}) {
  // Convert Express request to Web API Request #https://tanstack.com/router/v1/docs/framework/react/guide/ssr#rendering-the-application-on-the-server
  const protocol = req.protocol || 'http';
  const host = req.get('host') || 'localhost:3001';
  const url = new URL(req.originalUrl || req.url, `${protocol}://${host}`).href;

  const request = new Request(url, {
    method: req.method,
    headers: (() => {
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
      }
      return headers;
    })(),
  });

  // Create request handler with TanStack Router
  const handler = createRequestHandler({
    request,
    createRouter: () => {
      const router = createRouter();

      // Inject head content and CSS paths into router context, so that they can be accessed in the root route for proper HTML head generation
      router.update({
        context: {
          ...router.options.context,
          cssAssets,
          clientEntryScript,
        },
      });

      return router;
    },
  });

  // Render with streaming SSR (supports dehydration of query data)
  const response = await handler(({ request, responseHeaders, router }) =>
    renderRouterToStream({
      request,
      responseHeaders,
      router,
      children: <RouterServer router={router} />,
    })
  );

  // Convert Web API Response back to Express response
  res.statusMessage = response.statusText;
  res.status(response.status);

  response.headers.forEach((value, name) => {
    res.setHeader(name, value);
  });

  // Stream response body to Express
  if (response.body) {
    return pipeline(response.body as any, res);
  }

  res.end();
}
