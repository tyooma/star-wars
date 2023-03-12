import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import { useDispatch, useSelector } from 'react-redux'

import CharacterDetail from '../components/Characters/CharacterDetail'
import LikeButton from '../components/LikeButton/LikeButton'
import { wasLiked, wasUnliked } from '../store/fansSlice'
import {
  characterLiked,
  characterUnliked,
  getFilms,
  getStarships,
} from '../store/charactersSlice'
import { useGetHomeworldQuery } from '../services/starWarsApi'

const CharacterDetails = () => {
  const dispatch = useDispatch()
  const route = useRoute()
  const { goBack } = useNavigation()
  const { item } = route.params
  const character = useSelector(state =>
    state.charactersSlice.characters.find(
      character => character?.name === item?.name
    )
  )
  const starships = useSelector(state => state.charactersSlice.starships)
  const films = useSelector(state => state.charactersSlice.films)
  const loading = useSelector(state => state.charactersSlice.loading)
  const planet = useGetHomeworldQuery(Number(item.homeworld.match(/\d+/))).data
    ?.name

  const like = () => {
    if (character.liked === 0) {
      dispatch(wasLiked(item.gender))
      dispatch(characterLiked(item.name))
    } else {
      dispatch(wasUnliked(item.gender))
      dispatch(characterUnliked(item.name))
    }
  }

  useEffect(() => {
    dispatch(getStarships(item))
    dispatch(getFilms(item))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backButton} onPress={goBack}>
        <Image
          style={styles.backButtomImage}
          source={require('../assets/back_arrow.png')}
        />
        <Text style={styles.backButtonText} children='Back' />
      </Pressable>
      <View style={styles.header}>
        <Text style={styles.name} children={item.name} />
        <LikeButton like={like} liked={character.liked} />
      </View>
      <ScrollView style={styles.content}>
        {loading ? (
          <ActivityIndicator size='small' color='#000000' />
        ) : (
          <View style={styles.detailsContainer}>
            <CharacterDetail title='Gender' value={item.gender} />
            <CharacterDetail title='Birth Year' value={item.birth_year} />
            <CharacterDetail title='Height' value={item.height} />
            <CharacterDetail title='Weight' value={item.mass} />
            <CharacterDetail title='Skin Color' value={item.skin_color} />
            <CharacterDetail title='Hair Color' value={item.hair_color} />
            <CharacterDetail title='Eye Color' value={item.eye_color} />
            <CharacterDetail title='Homeworld' value={planet} />
            <CharacterDetail title='Starships' value={starships} long />
            <CharacterDetail title='Films' value={films} long />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default CharacterDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 15,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingLeft: 15,
    marginBottom: 20,
  },
  backButtomImage: {
    marginRight: 5,
    width: 8,
    height: 15,
  },
  backButtonText: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: '#000000',
  },
  header: {
    paddingLeft: 15,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    width: '80%',
    fontFamily: 'Starjedi',
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 32,
    color: '#000000',
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#ff99ff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
})
