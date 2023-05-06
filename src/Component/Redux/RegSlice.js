import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axios";

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};


const RegSlice = createSlice({
    name: 'registr',
    initialState,
    extraReducers: {
        [fetchRegister.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    }
});

export const selectIsRegister = (state) => Boolean(state.reg.data);

export const RegistrReducer = RegSlice.reducer;




