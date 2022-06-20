import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient";
import {createSlice, createAsyncThunk, Action} from '@reduxjs/toolkit';
import { useState } from "react";
import {AppDispatch} from '../../store';
import { useDispatch } from "react-redux";
// import {User} from '../../models/User';

interface RoleSliceState {
    // user?: User
    role: number,
    name: string
}



const initialRoleState: RoleSliceState = {
    role: 1,
    name: "guest user: "
}




const baseURL = "/auth"


export const apiLogin =  async (email:string, password:string): Promise<eCommerceApiResponse>  => {
  
  const response = await eCommerceClient.post<any>(
        `${baseURL}/login`,
       { email: email, password:password }
    );
    // initialUserState.user = response.data;
   
    
    
    console.log(response.data.admin);
    console.log(initialRoleState.role);
    return { status: response.status, payload: response.data };
};

export const apiLogout = async (): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.post<any>(
        `${baseURL}/logout`
    );
    initialRoleState.role = 1;
    return { status: response.status, payload: response.data };
}

export const apiRegister = async (firstName: string, lastName: string, email: string, password: string): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.post<any>(
        `${baseURL}/register`,
        { firstName: firstName, lastName: lastName, email: email, password: password }
    );
    return { status: response.status, payload: response.data };

}

// export const apiCheckLogin = async(): Promise<eCommerceApiResponse> => {
//     const response = await eCommerceClient.get<any>(
//         `${baseURL}/checkLogin`
//     );
//     return { status: response.status, payload: response.data };
// };

export const apiGetUser = async(): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<any>(
        `${baseURL}/getUser`
    );
    return { status: response.status, payload: response.data };
};

const RoleSlice = createSlice({
    name: "role",
    initialState: initialRoleState,
    reducers: {
        setInitRole: (state, action) => {
            if (action.payload.admin == null){
                state.role =1;
            }
            else if(action.payload.admin){
            state.role = 3;
            state.name = "Admin"
            }
            else {
                state.name = action.payload.firstName + " " + action.payload.lastName;
                state.role = 2;
            }
           
        }
    }
});
export const {setInitRole} = RoleSlice.actions;
export default RoleSlice.reducer;