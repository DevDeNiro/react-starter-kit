// src/modules/utilisateur/__tests__/useUtilisateurs.test.ts
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import { setupApiStore } from '@/testUtils'
import { utilisateursApi } from '../data/utilisateursApi'
import { useUtilisateurs } from '@modules/user/service/useUtilisateurs'
import { server } from '@/tests/msw/server'
import { rest } from 'msw'

test('useUtilisateurs returns list', async () => {
    const storeRef = setupApiStore(utilisateursApi)
    server.use(
        rest.get('/utilisateurs', (req, res, ctx) =>
            res(ctx.json([{ id: '2', nom: 'Bob', email: 'b@b.com' }]))
        )
    )

    const { result, waitForNextUpdate } = renderHook(() => useUtilisateurs(), {
        wrapper: ({ children }) => (
            <Provider store={storeRef.store}>{children}</Provider>
        ),
    })

    expect(result.current.isLoading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.utilisateurs).toHaveLength(1)
})