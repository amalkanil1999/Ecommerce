import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Rightarrow from '../assets/icons/RightArrow.svg'
import Carousel from './screen/Carousel'

export default function SignUp({ navigation }) {
  const clearAllItems = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  return (
    <SafeAreaView style={{flex:1,}}>
      <Carousel />
      <View style={styles.bottomContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.topsContainer}>
            <Text style={styles.textFont}>Tops</Text>
            <View style={styles.orangeContainer}></View>
          </View>
          <Text style={styles.textFont}>Tshirts</Text>
          <Text style={styles.textFont}>Hoddies</Text>
          <Text style={[styles.textFont,{textDecorationLine: 'underline',}]}>126 + categories</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Main')}>
            <Text style={{color:'#fff',marginRight:20, fontFamily: 'Gorditas-Bold',}}>Sign Up</Text>
            <Rightarrow style={{transform: [{scaleX: -1}]}} />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={clearAllItems}><Text>clear storage</Text></TouchableOpacity> */}
        </View>
        
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    paddingHorizontal: 30,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  leftContainer: {},
  topsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orangeContainer: {
    width: 20,
    height: 1,
    backgroundColor: '#FB975D',
    marginLeft: 10,
    marginBottom: 8,
  },
  textFont: {
    fontSize: 14,
    color: '#A6A6A6',
    marginBottom: 8,
    fontFamily: 'Gorditas-Regular',

  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderBottomRightRadius :8,
    borderTopRightRadius :8,
  },
})