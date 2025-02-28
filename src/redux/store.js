import { configureStore } from '@reduxjs/toolkit'
import authSlice  from './AuthSlice'

export const store = configureStore({
  reducer: {
    user: authSlice 
  }
})
