import {defineConfig} from "vitest/config";
import {loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";
import fs from "node:fs";

export default defineConfig(({mode}) => {
    // Load env variable
    const env = loadEnv(mode, process.cwd(), '');

    const getHttpsConfig = () => {
        if (mode === 'development' && env.VITE_USE_HTTPS === 'true') {
            const keyPath = env.VITE_SSL_KEY_PATH;
            const certPath = env.VITE_SSL_CERT_PATH;

            if (keyPath && certPath && fs.existsSync(keyPath) && fs.existsSync(certPath)) {
                return {
                    key: fs.readFileSync(keyPath),
                    cert: fs.readFileSync(certPath)
                };
            }
        }
        return undefined;
    };

    return {
        plugins: [
            react({
                include: "**/*.{jsx,tsx}",
            }),
        ],
        resolve: {
            alias: {
                // Simplification des alias avec un seul objet
                "@": path.resolve(__dirname, "src"),
                "@shared": path.resolve(__dirname, "src/shared"),
                "@components": path.resolve(__dirname, "src/components"),
                "@atoms": path.resolve(__dirname, "src/components/atoms"),
                "@molecules": path.resolve(__dirname, "src/components/molecules"),
                "@organisms": path.resolve(__dirname, "src/components/organisms"),
                "@pages": path.resolve(__dirname, "src/components/pages"),
                "@app": path.resolve(__dirname, "src/app"), // Ajout pour Redux
                "@hooks": path.resolve(__dirname, "src/shared/hooks"), // Ajout pour les hooks
            },
        },
        server: {
            host: env.VITE_HOST || "localhost",
            port: parseInt(env.VITE_PORT || "4200"),
            open: env.VITE_OPEN_BROWSER === 'true' ? (env.VITE_OPEN_URL || true) : false,
            https: getHttpsConfig(),
            hmr: {
                overlay: true, // Affiche les erreurs en overlay
            },
            proxy: {
                "/api": {
                    target: env.VITE_API_URL || "http://localhost:3000",
                    changeOrigin: true,
                    secure: false, // Pour les certificats auto-signés
                },
            },
        },
        // Optimisation du build
        build: {
            target: 'esnext',
            sourcemap: mode === 'development',
        },
        // Variables d'environnement exposées
        define: {
            __DEV__: mode === 'development',
        },
        test: {
            globals: true,
            environment: "jsdom",
            setupFiles: "./src/__tests__/setup.ts",
        },
    };
});