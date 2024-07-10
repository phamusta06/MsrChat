import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 _id:"",
 name:"",
 email:"",
 profile_pic:"",
 token:"",
 onlineUser:[],
 socketConnection : null
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profile_pic = action.payload.profile_pic;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
    setSocketConnection : (state,action)=>{
      state.socketConnection = action.payload
      
      },
    logout: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.profile_pic = "";
      state.token = "";
      state.onlineUser = [];
      state.socketConnection = null;
    }
  }
});

export const { setUser, setToken, setOnlineUser, setSocketConnection, logout } = authSlice.actions;

export default authSlice.reducer;