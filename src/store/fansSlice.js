import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  female: 0,
  male: 0,
  others: 0,
}

const fansSlice = createSlice({
  name: 'fans',
  initialState,
  reducers: {
    wasLiked(state, action) {
      if (action.payload === 'female') {
        state.female = state.female + 1
      } else if (action.payload === 'male') {
        state.male = state.male + 1
      } else {
        state.others = state.others + 1
      }
    },
    wasUnliked(state, action) {
      if (action.payload === 'female') {
        state.female = state.female - 1
      } else if (action.payload === 'male') {
        state.male = state.male - 1
      } else {
        state.others = state.others - 1
      }
    },
    wasCleared(state) {
      state.female = 0
      state.male = 0
      state.others = 0
    },
  },
})

export const { wasLiked, wasUnliked, wasCleared } = fansSlice.actions

export default fansSlice.reducer
