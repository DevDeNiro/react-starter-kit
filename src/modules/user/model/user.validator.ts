import {CreateUserDto} from "@modules/user/model/user.model.ts";

export function validateUser(dto: CreateUserDto): string[] {
    const errors: string[] = []
    if (!dto.nom.trim()) errors.push('Le nom est requis')
    if (!dto.email.includes('@')) errors.push("L'email n'est pas valide")
    return errors
}