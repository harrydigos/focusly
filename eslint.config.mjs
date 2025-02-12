import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";
import solid from "eslint-plugin-solid/configs/recommended";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  solid,
  eslintConfigPrettier,
  {
    ignores: [
      "node_modules/**",
      ".dist/**",
      ".vinxi/**",
      ".vercel/**",
      "public/",
    ],
  },
];
