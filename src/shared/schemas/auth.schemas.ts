import {z} from 'zod';

export const UserProfileSchema = z.object({
    id: z.string().uuid('User ID invalid'),
    email: z.string().email('Email invalid'),
    name: z.string().min(1, 'The name is required').max(100, 'Name too long'),
    roles: z.array(z.string()).default([]),
    avatar: z.string().url().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

export const AuthResponseSchema = z.object({
    user: UserProfileSchema,
    permissions: z.array(z.string()).default([]),
    accessToken: z.string().optional(), // Optional 'cause manage by OIDC
    refreshToken: z.string().optional(),
});

export const UpdateProfileSchema = UserProfileSchema.partial().omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type UpdateProfileRequest = z.infer<typeof UpdateProfileSchema>;