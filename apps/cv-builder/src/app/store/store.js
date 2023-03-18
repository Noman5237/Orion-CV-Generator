import { configureStore } from '@reduxjs/toolkit'
import profileSlice from '../cv/profile.slice'

export const store = configureStore({
  reducer: {
    profile: profileSlice,
  },
})
