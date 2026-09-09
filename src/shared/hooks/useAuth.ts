import {useAuth as useOidcAuth} from 'react-oidc-context';
import {useGetAuthenticatedUserDataQuery} from '@app/services/authService';
import {useEffect} from 'react';

export const useAuth = () => {
    const oidcAuth = useOidcAuth();

    const {
        data: userData,
        isLoading: isLoadingUserData,
        error: userDataError,
        refetch: refetchUserData,
    } = useGetAuthenticatedUserDataQuery(undefined, {
        skip: !oidcAuth.user,
    });

    useEffect(() => {
        const handleTokenExpired = () => {
            if (oidcAuth.user) {
                oidcAuth.signinSilent().catch(() => {
                    oidcAuth.signinRedirect();
                });
            }
        };

        window.addEventListener('oidc:token-expired', handleTokenExpired);
        return () => window.removeEventListener('oidc:token-expired', handleTokenExpired);
    }, [oidcAuth]);

    const isAuthenticated = !!oidcAuth.user;
    const isLoading = oidcAuth.isLoading || (isAuthenticated && isLoadingUserData);

    return {
        // OIDC state
        user: oidcAuth.user,
        isAuthenticated,
        isLoading,
        error: oidcAuth.error,

        // Data validated from the API
        userData: userData || null,
        userDataError,
        refetchUserData,

        // Actions
        login: oidcAuth.signinRedirect,
        logout: async () => {
            return oidcAuth.signoutRedirect();
        },
        removeUser: oidcAuth.removeUser,
        signinSilent: oidcAuth.signinSilent,
    };
};