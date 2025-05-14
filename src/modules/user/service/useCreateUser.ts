// src/modules/utilisateur/viewModel/useCreateUtilisateur.ts
import { useCallback } from 'react'

export function useCreateUtilisateur() {
    const [createUtilisateur, { isLoading, isError, error, isSuccess }] =
        useCreateUtilisateurMutation()

    const create = useCallback(
        async (dto: CreateUtilisateurDto) => {
            const errors = validateUtilisateur(dto)
            if (errors.length) {
                throw new Error(errors.join('; '))
            }
            return createUtilisateur(dto).unwrap()
        },
        [createUtilisateur]
    )

    return { create, isLoading, isError, error, isSuccess }
}