import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'

// Define a type for the slice state
interface ProfileState {
  value: {
    name: string,
    personal: any,
    educations: any[],
  }
}

const profile = {
  personal: {
    name: 'John Doe',
    email: 'john@orion.org'
  },

  educations: [
    {
      school: 'University of Orion',
      degree: 'Bachelor of Science',
      major: 'Computer Science',
      start: '2010-09-01',
      end: '2014-06-01'
    }
  ],
}
// Define the initial state using that type
const initialState: ProfileState = {
  value: profile,
}

export const profileSlice = createSlice({
  name: 'profile',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
})

export const { } = profileSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.profile.value

export default profileSlice.reducer

