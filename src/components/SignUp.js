import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import Carousel from './screen/Carousel'

export default function SignUp() {
  return (
    <SafeAreaView style={{flex:1,}}>
          {/* <Text>SignUp</Text> */}
      <Carousel />
      <View>
        <View>
          <View style={styles.topsContainer}>
            <Text>Tops</Text>
            <View></View>
          </View>
          <Text>Tshirts</Text>
          <Text>Hoddies</Text>
          <Text>126 + categories</Text>
        </View>
        <TouchableOpacity>
          <Text>Sign Up</Text>
          <Image source={require('../assets/Assets/RightArrow.svg')} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})