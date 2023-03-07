import { StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

import { useDebounce } from '../../hooks/useDebounce'

const LikeButton = ({ like, liked }) => {
  const { debounce } = useDebounce()
  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    }
  })

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(liked) }],
      opacity: withSpring(liked),
    }
  })

  return (
    <Pressable onPress={() => debounce(like)}>
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
        <Image source={require('../../assets/like.png')} />
      </Animated.View>
      <Animated.View style={fillStyle}>
        <Image source={require('../../assets/liked.png')} />
      </Animated.View>
    </Pressable>
  )
}

export default LikeButton
