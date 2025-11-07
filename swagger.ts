/**
 * Static OpenAPI (Swagger) specification
 *
 * This file replaces the dynamic swagger-jsdoc generation which can fail
 * in some Next.js runtime environments (Edge / App Router). A small,
 * explicit OpenAPI object is exported so the `/api/swagger/route.ts` can
 * safely embed it into the Swagger UI HTML.
 *
 * Update the paths/schemas below to reflect your API surface if you add
 * or change endpoints. Keep this file purely data (no runtime-only libs).
 */

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Phyllozinc API",
    version: "1.0.0",
    description:
      "API documentation for the Phyllozinc Next.js application (static OpenAPI spec).",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local server",
    },
  ],
  paths: {
    "/articles": {
      get: {
        summary: "List published articles",
        description: "Returns a list of published articles.",
        responses: {
          "200": {
            description: "A JSON array of articles",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Article" },
                },
              },
            },
          },
          "500": { description: "Server error" },
        },
      },
      post: {
        summary: "Create a new article",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ArticleInput" },
            },
          },
        },
        responses: {
          "201": { description: "Article created" },
          "400": { description: "Validation error" },
          "500": { description: "Server error" },
        },
      },
    },
    "/ai": {
      post: {
        summary: "Ask AI (chatbot)",
        description:
          "Send a user message to the AI assistant and get response.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                },
                required: ["message"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "AI reply",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    text: { type: "string" },
                  },
                },
              },
            },
          },
          "500": { description: "Server / AI provider error" },
        },
      },
    },
    "/upload": {
      post: {
        summary: "Upload an image asset",
        description: "Upload image to Supabase storage. Query param: filename",
        requestBody: {
          required: true,
          content: {
            "image/png": {},
            "image/jpeg": {},
            "image/webp": {},
            "image/gif": {},
          },
        },
        responses: {
          "200": {
            description: "Returns public URL for uploaded file",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { url: { type: "string" } },
                },
              },
            },
          },
          "400": { description: "Validation error" },
          "500": { description: "Upload failed" },
        },
      },
    },
    "/whitelist": {
      get: {
        summary: "Get whitelist",
        responses: {
          "200": {
            description: "Whitelist entries",
            content: {
              "application/json": {
                schema: { type: "array", items: { type: "object" } },
              },
            },
          },
        },
      },
      post: {
        summary: "Add to whitelist",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { email: { type: "string", format: "email" } },
                required: ["email"],
              },
            },
          },
        },
        responses: {
          "200": { description: "Added" },
          "400": { description: "Bad request" },
        },
      },
    },
  },
  components: {
    schemas: {
      Article: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          excerpt: { type: "string" },
          content: { type: "string" },
          image: { type: "string", nullable: true },
          date: { type: "string" },
          author: { type: "string" },
          category: { type: "string" },
          readTime: { type: "string", nullable: true },
          status: { type: "string" },
        },
      },
      ArticleInput: {
        type: "object",
        properties: {
          title: { type: "string" },
          excerpt: { type: "string" },
          content: { type: "string" },
          image: { type: "string" },
          date: { type: "string" },
          author: { type: "string" },
          category: { type: "string" },
          readTime: { type: "string" },
          status: { type: "string", enum: ["draft", "published"] },
        },
        required: ["title", "excerpt", "content", "date", "author", "category"],
      },
    },
  },
};

export default swaggerSpec;
