export interface User {
    id: string
    nom: string
    email: string
}

export type CreateUserDto = Omit<User, 'id'>