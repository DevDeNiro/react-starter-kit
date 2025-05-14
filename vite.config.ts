import {defineConfig} from "vite";
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react";
import * as path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(),],
    resolve: {
        alias: [
            {find: "@", replacement: path.resolve(__dirname, "src")},
            {find: "@shared", replacement: path.resolve(__dirname, "src/shared")},
            {find: "@modules", replacement: path.resolve(__dirname, "src/modules")},
            {
                find: "@components",
                replacement: path.resolve(__dirname, "src/components"),
            },
            {
                find: "@atoms",
                replacement: path.resolve(__dirname, "src/components/atoms"),
            },
            {
                find: "@molecules",
                replacement: path.resolve(__dirname, "src/components/molecules"),
            },
            {
                find: "@organisms",
                replacement: path.resolve(__dirname, "src/components/organisms"),
            },
            {
                find: "@pages",
                replacement: path.resolve(__dirname, "src/components/pages"),
            },
        ],
    },
    server: {
        host: "localhost.dev",
        port: 4200,
        open: "https://localhost.dev",
        https: process.env.NODE_ENV === "dev" && {
            key: "",
            cert: ""
        },
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
});
