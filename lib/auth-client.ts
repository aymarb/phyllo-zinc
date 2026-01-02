import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** Leave empty to use same origin - works for both localhost and production */
});
