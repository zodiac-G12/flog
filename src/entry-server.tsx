// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <title>ZODIACの技術ブログ - FLOG</title>
          <meta charset="utf-8" />
          <meta
            name="description"
            content="A programming technology blog by zodiac. We provide wide-ranging explanations on topics such as web development, infrastructure, AI, and security, and share practical code examples and know-how."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
