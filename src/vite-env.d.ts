/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NODE_ENV: string;
    readonly VITE_API_URL: string;
    readonly VITE_OIDC_AUTHORITY: string;
    readonly VITE_OIDC_CLIENT_ID: string;
    readonly VITE_OIDC_CLIENT_SECRET: string;
    readonly VITE_OIDC_REDIRECT_URI: string;
    readonly VITE_OIDC_POST_LOGOUT_REDIRECT_URI: string;
    readonly VITE_OIDC_SILENT_REDIRECT_URI: string;
    readonly VITE_HOST: string;
    readonly VITE_PORT: string;
    readonly VITE_USE_HTTPS: string;
    readonly VITE_SSL_KEY_PATH: string;
    readonly VITE_SSL_CERT_PATH: string;
    readonly VITE_OPEN_BROWSER: string;
    readonly VITE_OPEN_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare const __DEV__: boolean;