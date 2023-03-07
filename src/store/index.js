import { configureStore } from '@reduxjs/toolkit'

import charactersSlice from './charactersSlice'
import fansSlice from './fansSlice'

const store = configureStore({
  reducer: { charactersSlice, fansSlice },
})

export default store
