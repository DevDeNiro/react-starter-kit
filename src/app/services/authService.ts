import {api} from '../baseApi';
import {
    type AuthResponse,
    AuthResponseSchema,
    type UpdateProfileRequest,
    UpdateProfileSchema,
    type UserProfile,
    UserProfileSchema
} from '@shared/schemas/auth.schemas';

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getMyProfile: builder.query<UserProfile, void>({
            query: () => '/auth/profile',
            transformResponse: (response: unknown) => {
                const result = UserProfileSchema.safeParse(response);
                if (!result.success) {
                    console.error('Erreur de validation du profil:', result.error);
                    throw new Error('Format de profil invalide');
                }
                return result.data;
            },
            providesTags: ['Profile'],
        }),

        getAuthenticatedUserData: builder.query<AuthResponse, void>({
            query: () => '/auth/me',
            transformResponse: (response: unknown) => {
                const result = AuthResponseSchema.safeParse(response);
                if (!result.success) {
                    console.error('Erreur de validation auth:', result.error);
                    throw new Error('Format de réponse auth invalide');
                }
                return result.data;
            },
            providesTags: ['Auth', 'Profile'],
        }),

        updateMyProfile: builder.mutation<UserProfile, UpdateProfileRequest>({
            query: (data) => {
                // Validation avant envoi
                const validatedData = UpdateProfileSchema.parse(data);
                return {
                    url: '/auth/profile',
                    method: 'PATCH',
                    body: validatedData,
                };
            },
            transformResponse: (response: unknown) => {
                return UserProfileSchema.parse(response);
            },
            invalidatesTags: ['Profile', 'Auth'],
        }),

        getMyPermissions: builder.query<string[], void>({
            query: () => '/auth/permissions',
            transformResponse: (response: unknown) => {
                // Validation simple pour un array de strings
                if (!Array.isArray(response)) {
                    throw new Error('Format de permissions invalide');
                }
                return response.filter(p => typeof p === 'string');
            },
            providesTags: ['Auth'],
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth', 'Profile'],
        }),
    }),
});

export const {
    useGetMyProfileQuery,
    useGetAuthenticatedUserDataQuery,
    useUpdateMyProfileMutation,
    useGetMyPermissionsQuery,
    useLogoutMutation,
} = authApi;