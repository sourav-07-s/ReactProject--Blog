import { createSlice } from "@reduxjs/toolkit";

initialState = {
    status :false ,
    userData : null
}


const AuthSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{

        login:(state,action)=>{
            state.status = ture ;
            state.userData = action.payload ;
            
        },
        logout :(state) => {
            state.status = false ;
            state.userData = null ;
        }

    }
})

export const {login , logout} = AuthSlice.actions ;

export  default AuthSlice.reducer;