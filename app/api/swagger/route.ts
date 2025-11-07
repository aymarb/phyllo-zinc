import { NextResponse } from "next/server";
import swaggerSpec from "@/swagger";

export const dynamic = "force-static";

export async function GET() {
  // Generate HTML with CDN assets
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Swagger UI</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css"
    />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      const _spec = JSON.parse(decodeURIComponent("${encodeURIComponent(JSON.stringify(swaggerSpec))}"));
      const ui = SwaggerUIBundle({
        spec: _spec,
        dom_id: '#swagger-ui',
      });
    </script>
  </body>
  </html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
