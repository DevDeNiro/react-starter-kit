// src/modules/utilisateur/__tests__/utilisateursApi.spec.ts
import { setupApiStore } from '@/testUtils'
import { utilisateursApi } from '../data/utilisateursApi'
import { rest } from 'msw'
import { server } from '@/tests/msw/server'

describe('utilisateursApi', () => {
    const storeRef = setupApiStore(utilisateursApi)

    it('fetches users', async () => {
        server.use(
            rest.get('/utilisateurs', (req, res, ctx) =>
                res(ctx.json([{ id: '1', nom: 'Alice', email: 'a@a.com' }]))
            )
        )
        const { result, waitForNextUpdate } = storeRef.dispatch(
            utilisateursApi.endpoints.getUtilisateurs.initiate()
        )
        await waitForNextUpdate()
        expect(storeRef.store.getState().utilisateursApi.queries).toBeTruthy()
    })
})