import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint, { plugin } from "typescript-eslint";
// FIX: "lint": --max-warnings 0 --fix
export default tseslint.config({
    ignores: [
        "dist",
        "vite.config.ts",
        "coverage/**",
        "*.html",
        "*.css",
        "build/**",
        "dist/**",
    ],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
    },
    plugins: {
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
        "jsx-a11y": { enabled: false },
    },
    rules: {
        ...reactHooks.configs.recommended.rules,
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
    },
});
