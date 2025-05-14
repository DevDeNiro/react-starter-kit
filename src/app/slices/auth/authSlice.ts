import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const response = await authService.login(credentials);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data ?? 'Une erreur est survenue');
        }
    }
);

// Thunk pour l'inscription utilisateur
export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            const response = await authService.register(userData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Une erreur est survenue');
        }
    }
);

// Création du slice auth
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action pour définir un token reçu (par exemple après connexion ou via refresh)
        tokenReceived: (state, action) => {
            const token = action.payload;
            state.token = token;
            state.isAuthenticated = !!token;
            if (token) {
                localStorage.setItem('token', token);
            }
        },
        // Action pour déconnecter l'utilisateur
        loggedOut: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
        // Action pour mettre à jour les informations utilisateur
        userUpdated: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Gestion de l'état pendant la connexion
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Gestion de l'état pendant l'inscription
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

// Export des actions
export const { tokenReceived, loggedOut, userUpdated } = authSlice.actions;

// Export des sélecteurs
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

// Export du reducer
export default authSlice.reducer;