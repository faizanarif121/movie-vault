import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import type { ViteDevServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3001;

async function createServer() {
  const app = express();

  let vite: ViteDevServer | undefined;

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import('compression')).default;
    app.use(compression());
    app.use(express.static(path.resolve(__dirname, 'dist/client')));
  }

  app.use('/{*splat}', async (req, res) => {
    const url = req.originalUrl;

    try {
      // Skip static assets
      if (path.extname(url) !== '') {
        res.status(404).end(`${url} is not a valid route`);
        return;
      }

      // Build head content: Vite HMR scripts (dev) + client entry script
      let head = '';
      if (!isProduction && vite) {
        const transformedHtml = await vite.transformIndexHtml(
          url,
          '<html><head></head><body></body></html>'
        );
        head = transformedHtml.substring(
          transformedHtml.indexOf('<head>') + 6,
          transformedHtml.indexOf('</head>')
        );
        // Add the client entry script so the browser loads and hydrates
        head += `\n<script type="module" src="/src/entry-client.tsx"></script>`;
      } else {
        // Production: reference the built client entry
        head = `<script type="module" src="/static/entry-client.js"></script>`;
      }

      // Load the server entry module
      const entry = await (async () => {
        if (!isProduction && vite) {
          return vite.ssrLoadModule('/src/entry-server.tsx');
        } else {
          // @ts-ignore - dist module exists after build
          return import('./dist/server/entry-server.js');
        }
      })();

      // TanStack Router handles rendering, data fetching, and serialization
      await entry.render({ req, res, head });
    } catch (e) {
      if (!isProduction && vite) {
        vite.ssrFixStacktrace(e as Error);
      }
      console.error(e);
      res.status(500).end((e as Error).message);
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();
