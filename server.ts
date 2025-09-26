import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');

  server.use(express.json());

  // Example Express Rest API endpoints
  server.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the API' });
  });

  // Serve static files from /browser
  server.use(
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    }),
  );

  // Fallback to index.html for other routes (for Angular routing)
  server.get('*', (req, res) => {
    res.sendFile(resolve(browserDistFolder, 'index.html'));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
