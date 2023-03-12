import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const starWarsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  tagTypes: [],
  endpoints: builder => ({
    getCharacters: builder.query({
      query: page => `people/?page=${page}`,
    }),
    getHomeworld: builder.query({
      query: id => `planets/${id}`,
    }),
  }),
})

export const { useGetCharactersQuery, useGetHomeworldQuery } = starWarsApi
