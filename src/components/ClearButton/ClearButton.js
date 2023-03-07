import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'

import { wasCleared } from '../../store/fansSlice'
import { likesRemoved } from '../../store/charactersSlice'

const ClearButton = () => {
  const dispatch = useDispatch()

  const clearFans = () => {
    dispatch(wasCleared())
    dispatch(likesRemoved())
  }

  return (
    <Pressable style={styles.button} onPress={clearFans}>
      <Text style={styles.buttonText} children='Clear Fans' />
    </Pressable>
  )
}

export default ClearButton

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ff143b',
    opacity: 0.8,
  },
  buttonText: {
    fontFamily: 'Roboto-Light',
    color: '#ff143b',
  },
})
