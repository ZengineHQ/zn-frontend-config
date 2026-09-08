import { defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{

    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },

    rules: {
        "no-tabs": ["error", {
            allowIndentationTabs: true,
        }],

        indent: ["error", "tab", {
            SwitchCase: 1,
        }],

        semi: ["error", "always"],
        "no-extra-semi": "error",
    },
}]);
