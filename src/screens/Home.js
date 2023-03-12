import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import {
  charactersRequest,
  charactersRequestFailure,
  charactersRequestSuccess,
  charactersListEnd,
} from '../store/charactersSlice'
import CharactersList from '../components/Characters/CharactersList'
import FansTab from '../components/FansTab/FansTab'
import { useGetCharactersQuery } from '../services/starWarsApi'

const Home = () => {
  const dispatch = useDispatch()
  const characters = useSelector(state => state.charactersSlice.characters)
  const moreLoading = useSelector(state => state.charactersSlice.moreLoading)
  const isListEnd = useSelector(state => state.charactersSlice.isListEnd)
  const [page, setPage] = useState(1)
  const { data, error, isLoading } = useGetCharactersQuery(page)

  const getCharacters = () => {
    dispatch(charactersRequest(page))

    if (page > 10) {
      dispatch(charactersListEnd())

      return
    }

    if (error) {
      dispatch(charactersRequestFailure(error))

      return
    }

    if (!isLoading) {
      const characters = data.results.map(character => {
        return {
          ...character,
          liked: 0,
        }
      })

      dispatch(charactersRequestSuccess(characters))
    }
  }

  const fetchMoreData = () => {
    if (!isListEnd && !moreLoading) {
      setPage(page + 1)
    }
  }

  useEffect(() => {
    getCharacters()
  }, [page])

  return (
    <SafeAreaView style={styles.container}>
      <FansTab />
      {isLoading ? (
        <ActivityIndicator size='small' color='#000000' />
      ) : (
        <CharactersList
          characters={characters}
          fetchMoreData={fetchMoreData}
          isListEnd={isListEnd}
          moreLoading={moreLoading}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
})

export default Home
