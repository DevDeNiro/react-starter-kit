// src/modules/utilisateur/view/CreateUtilisateurForm.tsx
import React, {useState} from 'react'
import {useCreateUtilisateur} from "@modules/user/service/useCreateUser.ts";

export function CreateUtilisateurForm() {
    const [nom, setNom] = useState('')
    const [email, setEmail] = useState('')
    const {create, isLoading, isError, error} = useCreateUtilisateur()

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await create({nom, email})
            setNom('')
            setEmail('')
        } catch (err) {
            if (err instanceof Error) {
                console.error(err)
            } else {
                console.error('Une erreur inconnue est survenue', err)
            }
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                value={nom}
                onChange={e => setNom(e.target.value)}
                placeholder="Nom"
                required
            />
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Création…' : 'Créer'}
            </button>
            {isError && <div className="error">Erreur : {String(error)}</div>}
        </form>
    )
}