import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase/firease";

interface IUserState {
    user: {
        email: string | null;
    }
    isLoading: boolean;
    isError: boolean;
    error: string | null;
}

interface ICredentials {
    email: string;
    password: string;
}
const initialState: IUserState = {
    user: {
        email: null
    },
    isLoading: false,
    isError: false,
    error: null
}

export const createUser = createAsyncThunk(
    'user/createUser',
    async ({ email, password }: ICredentials) => {
        const data = await createUserWithEmailAndPassword(auth, email, password)
        return data.user.email
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password, signed }: ICredentials) => {
        const data = await signInWithEmailAndPassword(auth, email, password)
        return data.user
        // return data.user.email
    }
)
// export const logoutUser = createAsyncThunk(
//     'user/logoutUser',
//     async ({ }: ICredentials) => {
//         const data = await signOut(auth, )
//         return data
//     }
// )

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setStateUser: (state, action) => {
            state.user.email = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null
        }).addCase(createUser.fulfilled, (state, action) => {
            state.user.email = action.payload;
            state.isLoading = false;
        }).addCase(createUser.rejected, (state, action) => {
            state.user.email = null;
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message!
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.user.email = action.payload;
            state.isLoading = false;
        }).addCase(loginUser.rejected, (state, action) => {
            state.user.email = null;
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message!
        })
    }
})

export const {setStateUser, setLoading} = userSlice.actions
export default userSlice.reducer