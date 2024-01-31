import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Leftarrow from '../assets/icons/LeftArrow.svg'

import Bag from '../assets/icons/bag.svg'

const Cart = () => {
  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
              <Leftarrow height={27} width={27} />
              <Text>My Cart</Text>
              <Bag  height={27} width={27} />
          </View>
      <Text>Cart</Text>
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})