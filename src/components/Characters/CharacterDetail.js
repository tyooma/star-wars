import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CharacterDetail = ({ title, value, long }) => {
  return (
    <>
      {long ? (
        <View style={styles.container}>
          <Text style={styles.title}>
            {title}:&nbsp;
            <Text style={styles.value} children={value} />
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title} children={`${title}: `} />
          <Text style={styles.value} children={value} />
        </View>
      )}
    </>
  )
}

export default CharacterDetail

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  title: {
    fontFamily: 'Starjedi',
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    fontWeight: '300',
    color: '#000000',
  },
})
