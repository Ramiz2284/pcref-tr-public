import { configureStore } from '@reduxjs/toolkit';
import { estimateReducer } from './EstimateSlice';
import formSlice from './formSlice';
import { loginReducer } from './LoginSlice';
import { RegistrReducer } from './RegSlice';



const store = configureStore({
    reducer:
    {
        formSlice,
        auth: loginReducer,
        reg: RegistrReducer,
        estimate: estimateReducer
    }

});

export default store;
