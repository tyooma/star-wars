import { configureStore } from '@reduxjs/toolkit'
import { starWarsApi } from '../services/starWarsApi'

import charactersSlice from './charactersSlice'
import fansSlice from './fansSlice'

const store = configureStore({
  reducer: {
    [starWarsApi.reducerPath]: starWarsApi.reducer,
    charactersSlice,
    fansSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
})

export default store
