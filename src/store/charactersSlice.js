import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getStarships = createAsyncThunk(
  'characters/getStarshipsStatus',
  async character => {
    let starshipsArray = []

    await axios.all(character.starships?.map(link => axios.get(link))).then(
      axios.spread(function (...responses) {
        responses.map(response => {
          starshipsArray.push(response.data.name)
        })
        if (!starshipsArray.length) {
          starshipsArray = ['none']

          return
        }
      })
    )

    return starshipsArray.join(', ')
  }
)

export const getFilms = createAsyncThunk(
  'characters/getFilmsStatus',
  async character => {
    let filmsArray = []

    await axios.all(character.films?.map(link => axios.get(link))).then(
      axios.spread(function (...responses) {
        responses.map(response => {
          filmsArray.push(response.data.title)
        })
      })
    )

    return filmsArray.join(', ')
  }
)

const initialState = {
  characters: [],
  loading: false,
  moreLoading: false,
  error: '',
  isListEnd: false,
  starships: '',
  films: '',
}

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    charactersRequest(state, action) {
      if (action.payload === 1) {
        state.loading = true
      } else {
        state.moreLoading = true
      }
    },
    charactersRequestSuccess(state, action) {
      state.characters = [...state.characters, ...action.payload]
      state.loading = false
      state.moreLoading = false
    },
    charactersRequestFailure(state, action) {
      state.error = action.payload
      state.loading = false
      state.moreLoading = false
    },
    charactersListEnd(state) {
      state.isListEnd = true
      state.loading = false
      state.moreLoading = false
    },
    characterLiked(state, action) {
      state.characters = state.characters.map(character => {
        let liked = character?.liked
        if (character?.name === action.payload) {
          liked = 1
        }
        return {
          ...character,
          liked,
        }
      })
    },
    characterUnliked(state, action) {
      state.characters = state.characters.map(character => {
        let liked = character?.liked
        if (character?.name === action.payload) {
          liked = 0
        }
        return {
          ...character,
          liked,
        }
      })
    },
    likesRemoved(state) {
      state.characters = state.characters.map(character => {
        return {
          ...character,
          liked: 0,
        }
      })
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getStarships.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getStarships.fulfilled, (state, action) => {
        state.starships = action.payload
      })
      .addCase(getStarships.rejected, (state, action) => {
        state.error = action.payload.errorMessage
      })
    builder
      .addCase(getFilms.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getFilms.fulfilled, (state, action) => {
        state.loading = false
        state.films = action.payload
      })
      .addCase(getFilms.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.errorMessage
      })
  },
})

export const {
  charactersRequest,
  charactersRequestSuccess,
  charactersRequestFailure,
  charactersListEnd,
  characterLiked,
  characterUnliked,
  likesRemoved,
} = charactersSlice.actions

export default charactersSlice.reducer
