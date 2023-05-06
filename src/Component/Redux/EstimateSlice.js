import { createSlice } from '@reduxjs/toolkit';




const initialState = {

    ratedСard:
    {
        video: '',
        motherboard: '',
        processor: '',
        memory: '',
        storage: '',
        price: '',
        power: '',
        case: '',
        description: '',
        image: '',
    },

};

const estimateSlice = createSlice({
    name: "estimate",
    initialState,
    reducers: {
        submitPrice: (state, action) => {
            state.ratedСard = action.payload;
        },
    },
});


export const ratedСard = (state) => (state.estimate.ratedСard);
export const { submitPrice } = estimateSlice.actions;
export const estimateReducer = estimateSlice.reducer;


