// src/app/baseApi.ts
import {createApi, fetchBaseQuery, retry, RootState} from '@reduxjs/toolkit/query/react'
import type {BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query'
import {Mutex} from 'async-mutex'
import {loggedOut, tokenReceived} from '../features/auth/authSlice'
// https://dev.to/forhad96/using-redux-toolkit-query-to-create-an-authentication-api-with-injectendpoints-2h57

const RAW_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

const rawBaseQuery = fetchBaseQuery({
    baseUrl: RAW_BASE_URL,
    prepareHeaders: (headers, {getState, endpoint}) => {
        const token = (getState() as RootState<any, any, any>).auth.token
        if (token) headers.set('authorization', `Bearer ${token}`)
        return headers
    },
})

const baseQueryWithRetry = retry(rawBaseQuery, {
    maxRetries: 3,
})

const mutex = new Mutex()
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, unknown> =
    async (args, api, extraOptions) => {
        await mutex.waitForUnlock()
        let result = await baseQueryWithRetry(args, api, extraOptions)

        if (result.error?.status === 401) {
            if (!mutex.isLocked()) {
                const release = await mutex.acquire()
                try {
                    const refresh = await rawBaseQuery('/auth/refresh', api, extraOptions)
                    if (refresh.data) {
                        api.dispatch(tokenReceived((refresh.data as any).token))
                        result = await rawBaseQuery(args, api, extraOptions)
                    } else {
                        api.dispatch(loggedOut())
                    }
                } finally {
                    release()
                }
            } else {
                await mutex.waitForUnlock()
                result = await rawBaseQuery(args, api, extraOptions)
            }
        }

        return result
    }

// 6. On crée l’API partagée
export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Exercices', 'Sports'],
    endpoints: () => ({}),
})