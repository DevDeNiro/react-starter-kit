// https://dev.to/forhad96/using-redux-toolkit-query-to-create-an-authentication-api-with-injectendpoints-2h57

import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';
import type {BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query';
import {Mutex} from 'async-mutex';

const RAW_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const getOidcToken = (): string | null => {
    try {
        const oidcStorage = localStorage.getItem(`oidc.user:${import.meta.env.VITE_OIDC_AUTHORITY}:${import.meta.env.VITE_OIDC_CLIENT_ID}`);
        if (oidcStorage) {
            const user = JSON.parse(oidcStorage);
            return user.access_token ?? null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du token OIDC:', error);
    }
    return null;
};

const rawBaseQuery = fetchBaseQuery({
    baseUrl: RAW_BASE_URL,
    prepareHeaders: (headers) => {
        const token = getOidcToken();

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        headers.set('content-type', 'application/json');
        return headers;
    },
});

const baseQueryWithRetry = retry(rawBaseQuery, {
    maxRetries: 2,
});

const mutex = new Mutex();

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, unknown> =
    async (args, api, extraOptions) => {
        await mutex.waitForUnlock();
        let result = await baseQueryWithRetry(args, api, extraOptions);

        if (result.error?.status === 401) {
            if (!mutex.isLocked()) {
                const release = await mutex.acquire();
                try {
                    // Pour OIDC, on ne gère pas le refresh ici car react-oidc-context s'en charge
                    // On force juste une redirection vers la page de login
                    console.warn('Token expiré, redirection nécessaire');

                    // Optionnel : déclencher un event custom pour forcer la reconnexion OIDC
                    window.dispatchEvent(new CustomEvent('oidc:token-expired'));

                } finally {
                    release();
                }
            } else {
                await mutex.waitForUnlock();
                result = await rawBaseQuery(args, api, extraOptions);
            }
        }

        return result;
    };

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        'User',
        'Profile',
        'Auth'
        // Modules
    ],
    endpoints: () => ({}),
});