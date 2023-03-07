import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'

import CharacterListItem from './CharacterListItem'

const CharactersList = ({
  characters,
  fetchMoreData,
  isListEnd,
  moreLoading,
}) => {
  const renderFooter = () => (
    <View style={styles.footer}>
      {moreLoading && <ActivityIndicator size='small' color='#000000' />}
      {isListEnd && <Text children='No more characters at the moment' />}
    </View>
  )

  return (
    <FlashList
      data={characters}
      renderItem={({ item }) => <CharacterListItem item={item} />}
      renderFooter={renderFooter}
      estimatedItemSize={250}
      contentContainerStyle={styles.list}
      onEndReachedThreshold={0.2}
      onEndReached={fetchMoreData}
    />
  )
}

export default CharactersList

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 15,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
})
