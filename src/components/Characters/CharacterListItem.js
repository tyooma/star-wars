import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { useDispatch } from 'react-redux'

import { wasLiked, wasUnliked } from '../../store/fansSlice'
import LikeButton from '../LikeButton/LikeButton'
import { characterLiked, characterUnliked } from '../../store/charactersSlice'

const CharacterListItem = ({ item }) => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  const goToDetails = () => navigate('CharacterDetails', { item })

  const like = () => {
    if (item.liked === 0) {
      dispatch(wasLiked(item.gender))
      dispatch(characterLiked(item.name))
    } else {
      dispatch(wasUnliked(item.gender))
      dispatch(characterUnliked(item.name))
    }
  }

  return (
    <Pressable style={styles.container} onPress={goToDetails}>
      <View>
        <Text style={styles.name} children={item.name} />
        <Text style={styles.gender} children={item.gender} />
      </View>
      <LikeButton like={like} liked={item.liked} />
    </Pressable>
  )
}

export default CharacterListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#cccc00',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  name: {
    marginBottom: 5,
    fontFamily: 'Roboto-Black',
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
  },
  gender: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: '#8a8a8a',
  },
})
