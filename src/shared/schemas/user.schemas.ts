import {z} from 'zod';

export const UserSchema = z.object({
    id: z.string().uuid('User ID invalid'),
    email: z.string().email('Email invalid'),
    name: z.string().min(1, 'The name is required').max(100, 'Nom trop long'),
    avatar: z.string().url('avatar URL invalide').optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export const CreateUserRequestSchema = z.object({
    name: z.string().min(1, 'The name is required').max(100),
    email: z.string().email('Email invalid'),
    avatar: z.string().url().optional(),
});

export type User = z.infer<typeof UserSchema>;
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;