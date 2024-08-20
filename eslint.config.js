import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from "eslint-config-prettier"

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      "no-undef": "error",
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "warn"
    },
  },
  {
    ignores: ["**/node_modules/", "**/build/"],
  },
);
