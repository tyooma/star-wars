import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ClearButton from '../ClearButton/ClearButton'

const FansTab = () => {
  const femaleFans = useSelector(state => state.fansSlice.female)
  const maleFans = useSelector(state => state.fansSlice.male)
  const othersFans = useSelector(state => state.fansSlice.others)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLogo}>
          <Image
            style={styles.logo}
            source={require('../../assets/sw_logo.png')}
          />
          <Text style={styles.title} children='FANS' />
        </View>
        {femaleFans + maleFans + othersFans > 0 && <ClearButton />}
      </View>
      <View style={styles.typesContainer}>
        <View style={styles.typeItem}>
          <Text style={styles.typeItemTitle} children='Female Fans' />
          <Text style={styles.typeItemCount} children={femaleFans} />
        </View>
        <View style={styles.typeItem}>
          <Text style={styles.typeItemTitle} children='Male Fans' />
          <Text style={styles.typeItemCount} children={maleFans} />
        </View>
        <View style={styles.typeItem}>
          <Text style={styles.typeItemTitle} children='Others' />
          <Text style={styles.typeItemCount} children={othersFans} />
        </View>
      </View>
    </View>
  )
}

export default FansTab

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 15,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogo: {
    flexDirection: 'row',
  },
  logo: { width: 90, height: 70, marginRight: 5 },
  title: {
    textAlign: 'center',
    fontFamily: 'Starjedi',
    fontSize: 32,
    fontWeight: 500,
    lineHeight: 65,
    color: '#000000',
  },
  typesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeItem: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    width: 110,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#ff99ff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.62,
    elevation: 4,
  },
  typeItemTitle: {
    marginBottom: 5,
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    color: '#707070',
  },
  typeItemCount: {
    fontFamily: 'Roboto-Black',
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
})
