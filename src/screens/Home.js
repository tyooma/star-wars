import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import {
  charactersRequest,
  charactersRequestFailure,
  charactersRequestSuccess,
  charactersListEnd,
} from '../store/charactersSlice'
import CharactersList from '../components/Characters/CharactersList'
import FansTab from '../components/FansTab/FansTab'

const Home = () => {
  const dispatch = useDispatch()
  const characters = useSelector(state => state.charactersSlice.characters)
  const loading = useSelector(state => state.charactersSlice.loading)
  const moreLoading = useSelector(state => state.charactersSlice.moreLoading)
  const isListEnd = useSelector(state => state.charactersSlice.isListEnd)
  const [page, setPage] = useState(1)

  const getCharacters = () => {
    dispatch(charactersRequest(page))

    if (page === 10) {
      dispatch(charactersListEnd())

      return
    }

    try {
      axios.get(`https://swapi.dev/api/people/?page=${page}`).then(response => {
        const characters = response.data.results.map(character => {
          return {
            ...character,
            liked: 0,
          }
        })

        dispatch(charactersRequestSuccess(characters))
      })
    } catch (error) {
      dispatch(charactersRequestFailure(error))
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
      {loading ? (
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
