import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

import Leftarrow from '../assets/icons/LeftArrow.svg'
import Like from '../assets/icons/like.svg';
import Liked from '../assets/icons/red-hearted.svg';

const {width, height} = Dimensions.get('screen');


export default function Page({ route, navigation }) {
  const { item } = route.params
  const [updatedSize, setUpdatedSize] = useState(1)
  const [size, setSize] = useState("S")
  const [color, setColor] = useState('#fff')
  const [updatedColor, setUpdatedColor] = useState(0)
  const [heart, setHeart] = useState(false)
  
  const cartedItem = async () => {
    const product = {
      id: `${item.id + size }`,
      style: item.style,
      name: item.name,
      image: item.image,
      size: size,
      color: color,
      finalPrice: item.price,
      price: item.price,
      quantity: 1,
    }

    try {
      const storedItems = await AsyncStorage.getItem('items');
      let itemsArray = storedItems ? JSON.parse(storedItems) : [];
      const existingItem = itemsArray.find((item) => item.id === product.id); // existimgItem is the single item which have the same id as the current product
      
      if (existingItem != undefined) {
        existingItem.quantity += 1
        existingItem.finalPrice = (existingItem.quantity * existingItem.price).toFixed(2)

        await AsyncStorage.setItem('items', JSON.stringify(itemsArray))
        navigation.navigate('Cart')
      } else {
        await AsyncStorage.setItem('items', JSON.stringify([...itemsArray, product]))
        navigation.navigate('Cart')
      }
    } catch (error) {
      console.log('Invalid product, please try again', error)
    }
  }
  
  const colorList = [
    {
        id :0,
        color:'#fff'
    },
    {
        id :1,
        color:'#C4B5B1'
    },
    {
        id :2,
        color:'#D6E1FD'
    },
    {
        id :3,
        color:'#F6D6FE'
    },
    {
        id :4,
        color:'#D5EEED'
    },
    {
        id :5,
        color:'#D9D9D9'
    },
    {
        id :6,
        color:'#FED6DF'
    },
  ]
  const sizeList=[
    {
        id :1,
        size:'S'
    },
    {
        id :2,
        size:'M'
    },
    {
        id :3,
        size:'L'
    },
    {
        id :4,
        size:'XL'
    },
    {
        id :5,
        size:'XXL'
    },
  ]
  
  const updateSize = (data) => {
    setUpdatedSize(data.id)
    setSize(data.size)
  }
  const updateColor = (data) => {
    setUpdatedColor(data.id)
    setColor(data.color)
  }
  
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=> navigation.goBack()}><Leftarrow height={27} width={27} /></TouchableOpacity>
        <TouchableOpacity onPress={()=>setHeart(!heart)}>{heart == false?<Like height={30} width={30} />:<Liked height={30} width={30}  />}</TouchableOpacity>
      </View>
      <View style={styles.spotlightContainer}>
      <Text style={[styles.pageText,{marginBottom: 5,}]}>
          {item.style} {item.name}
        </Text>
        <Text style={styles.pageText}>
          ${item.price}
        </Text>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.sliderImage} resizeMode='stretch' />
        </View>
      </View>
      <View style={styles.size}>
        <Text style={styles.filterHead}>Select Size</Text>
        <View style={styles.sizeContainer}>
          {sizeList.map((data) => (
            <TouchableOpacity key={data.id} onPress={()=> {updateSize(data)}} style={updatedSize == data.id?styles.selectedSize:styles.unselectedSize} >
              <Text style={updatedSize==data.id?styles.selectedText:styles.unselectedText}>{data.size}</Text>
          </TouchableOpacity>
          ))}
          
        </View>
      </View>
      <View style={styles.color}>
      <Text style={styles.filterHead}>Select Color</Text>
        <View style={styles.colorContainer}>
          {colorList.map((data) => (
            <TouchableOpacity key={data.id} onPress={()=>{updateColor(data)}} style={updatedColor == data.id?[styles.selectedColor,{backgroundColor:data.color, borderColor: '#FB975D',borderWidth: 1.5,}]:[styles.selectedColor,{backgroundColor:data.color,borderColor:data.color,}]}></TouchableOpacity> 
          ))}
      </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.price}>$ {item.price}</Text>
        <TouchableOpacity style={styles.cartButton} onPress={cartedItem}>
          <Text style={styles.cartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spotlightContainer: {
    marginVertical: 15,
  },
  imageContainer: {
    width: width - 40,
    height: 350,
    
  },
  pageText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Gorditas-Regular',
    textAlign: 'center',
    marginBottom: 10,
  },
  
  sliderImage: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderRadius: 8,
  },
  size: {
    marginVertical: 10,
  },
  filterHead: {
    fontSize: 16,
    fontFamily: 'Gorditas-Bold',
    color: '#000',
    marginBottom: 10,
  },
  color: {
    marginVertical: 10,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  price: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Gorditas-Bold',
  },
  cartButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 10,
  },
  cartText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Gorditas-Regular',
  },
  sizeContainer: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  selectedSize: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: "#FB975D",
    borderWidth: 1,
    borderColor: "#FB975D",
    marginRight: 10,
  },
  selectedText: {
    color: '#fff',
    fontSize: 14,
  },
  unselectedSize: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: '#A6A6A6',
    marginRight: 10,
  },
  unselectedText: {
    color: '#000',
    fontSize: 14,
  },
  colorContainer: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  selectedColor: {
    height: 23,
    width: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: "#FB975D",
    marginRight: 10,
  },
})