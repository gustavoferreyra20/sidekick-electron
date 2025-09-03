

import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script", // CommonJS style
      globals: globals.browser,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
]);
