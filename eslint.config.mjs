import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import node from "eslint-plugin-node";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";


export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      node,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "no-unused-vars": "warn",
      "semi": ["error", "always"],
      "no-console": "warn",
    },
  },
  prettierConfig,
];
