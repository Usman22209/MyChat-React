import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/react-in-jsx-scope": "off", 
      "react/jsx-uses-react": "off",
    },
    settings: {
      react: {
        version: "detect", 
      },
    },
  },
  {
    // Global project configuration
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
];