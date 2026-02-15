import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import type { ViteDevServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3001;

let cssAssets: string[] = [];
let clientEntryScript = '';

let manifestCache: Record<string, unknown> | null = null;

function loadManifest() {
  if (!isProduction) return null;
  
  if (manifestCache) {
    return manifestCache;
  }

  try {
    const manifestPath = path.resolve(__dirname, 'dist/client/.vite/manifest.json');
    manifestCache = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    return manifestCache;
  } catch (error) {
    console.error('Failed to load manifest:', error);
    return null;
  }
}

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

      // Scripts and CSS links are defined in __root.tsx head() config.
      // In dev, Vite's transformIndexHtml injects HMR client scripts.
      if (!isProduction && vite) {
        // Dev: Vite handles injection, but we point to the source
        clientEntryScript = '/src/entry-client.tsx';
      } else {
        // Prod: Read from cached manifest
        const manifest = loadManifest();
        if (!manifest) {
          res.status(500).end('Failed to load manifest');
          return;
        }
        
        const entry = (manifest as Record<string, Record<string, unknown>>)['src/entry-client.tsx'];
        clientEntryScript = `/${entry.file}`;
        cssAssets = entry.css ? (entry.css as string[]).map((file: string) => `/${file}`) : [];
      }

      // Load the server entry module
      const entry = await (async () => {
        if (!isProduction && vite) {
          return vite.ssrLoadModule('/src/entry-server.tsx');
        } else {
          return import('./dist/server/entry-server.js');
        }
      })();

      // TanStack Router handles rendering, data fetching, and serialization
      await entry.render({ req, res, cssAssets, clientEntryScript });
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
