import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image} from 'react-native'
import React from 'react'
import Menu from '../assets/icons/hamburger-menu.svg'
import SearchIcon from '../assets/icons/search.svg'
import Bag from '../assets/icons/bag.svg'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Slider from './screen/Slider'

export default function Main({navigation}) {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View>
          <TouchableOpacity>
           <Menu width={23} height={23} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
          <SearchIcon width={25} height={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
          <Bag width={25} height={25} marginLeft={15} />
          </TouchableOpacity> 
        </View>
      </View>
      <View style={styles.categoryContainer}>
      </View>
      <View style={styles.orange}>
        <Text style={styles.styleText}>Find Your Style</Text>
        <Image style={styles.orangeImage} source={require('../assets/icons/orange_thread.png')}/>
      </View>
      <View>
        <Slider navigation={navigation} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orange: {
    paddingVertical: 10,
    paddingHorizontal: 20,

  },
  styleText: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'Gorditas-Bold',
    // fontFamily: 'Gorditas-Regular',
  },
  orangeImage: {
    marginLeft: 100,
    marginTop: -2,
  },
},)