// src/modules/utilisateur/__tests__/useCreateUtilisateur.test.ts
import { renderHook, act } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import { setupApiStore } from '@/testUtils'
import { utilisateursApi } from '../data/utilisateursApi'
import { useCreateUtilisateur } from '@modules/user/service/useCreateUtilisateur'
import { server } from '@/tests/msw/server'
import { rest } from 'msw'

test('createUtilisateur validation fails', async () => {
    const storeRef = setupApiStore(utilisateursApi)
    const { result } = renderHook(() => useCreateUtilisateur(), {
        wrapper: ({ children }) => (
            <Provider store={storeRef.store}>{children}</Provider>
        ),
    })

    await expect(act(async () => result.current.create({ nom: '', email: 'x' }))).rejects.toThrow(
        /nom est requis/
    )
})

test('createUtilisateur mutation success', async () => {
    const storeRef = setupApiStore(utilisateursApi)
    server.use(
        rest.post('/utilisateurs', (req, res, ctx) =>
            res(ctx.status(201), ctx.json({ id: '3', nom: 'Cc', email: 'c@c.com' }))
        )
    )
    const { result, waitFor } = renderHook(() => useCreateUtilisateur(), {
        wrapper: ({ children }) => (
            <Provider store={storeRef.store}>{children}</Provider>
        ),
    })

    await act(async () => result.current.create({ nom: 'Cc', email: 'c@c.com' }))
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
})