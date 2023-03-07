import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  characters: [],
  loading: false,
  moreLoading: false,
  error: '',
  isListEnd: false,
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
