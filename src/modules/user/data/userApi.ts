import {api} from "@/src/app/baseApi.ts";
import {CreateUserDto, User} from "@modules/user/model/user.model.ts";

export const userApi = api.injectEndpoints({
    reducerPath: 'userApi',
    tagTypes: ['Users'],
    endpoints: builder => ({
        getUsers: builder.query<User[], void>({
            query: () => '/users',
            providesTags: ['Users'],
        }),
        createUser: builder.mutation<User, CreateUserDto>({
            query: dto => ({
                url: '/users',
                method: 'POST',
                body: dto,
            }),
            invalidatesTags: ['Users'],
        }),
        // tu peux ajouter updateUtilisateur, deleteUtilisateur, getUtilisateurById…
    }),
})

export const {
    useCreateUser,
} = userApi