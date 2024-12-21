import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import { fixupPluginRules, includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  includeIgnoreFile(path.resolve(__dirname, ".gitignore")),
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 2020,
      sourceType: "commonjs",
    },

    rules: {
      curly: "error",
      "dot-notation": "error",
      "id-length": "error",
      "no-const-assign": "error",
      "no-dupe-class-members": "error",
      "no-else-return": "error",
      "no-inner-declarations": "error",
      "no-lonely-if": "error",

      "no-magic-numbers": [
        "error",
        {
          ignore: [-1, 0, 1],
        },
      ],

      "no-shadow": "error",
      "no-undef": "error",
      "no-unneeded-ternary": "error",
      "no-unused-expressions": "error",

      "no-unused-vars": [
        "error",
        {
          args: "none",
        },
      ],

      "no-useless-return": "error",
      "no-var": "error",
      "one-var": ["error", "never"],
      "prefer-const": "error",
      "prefer-promise-reject-errors": "error",

      "sort-keys": [
        "error",
        "asc",
        {
          caseSensitive: true,
          natural: true,
        },
      ],

      "sort-vars": "error",
      strict: ["error", "global"],
    },
  },
  {
    files: ["*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
    rules: {
      "sort-keys": "off",
    },
  },
  {
    files: ["src/**/*.js"],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...Object.fromEntries(
          Object.entries(globals.node).map(([key]) => [key, "off"])
        ),
      },

      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
  {
    files: ["src/background/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  ...compat.extends("plugin:react/recommended").map((config) => ({
    ...config,
    files: ["src/options/**/*.js"],
  })),
  {
    files: ["src/options/**/*.js"],

    plugins: {
      "react-hooks": fixupPluginRules(reactHooks),
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "react/react-in-jsx-scope": "off",
    },
  },
  eslintConfigPrettier,
];
