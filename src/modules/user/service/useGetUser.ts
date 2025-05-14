export function useGetUser() {
    const {
        data: utilisateurs = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useGetUtilisateursQuery()

    return { utilisateurs, isLoading, isError, error, refetch }
}