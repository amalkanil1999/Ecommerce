import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

import Leftarrow from '../assets/icons/LeftArrow.svg'
import Bag from '../assets/icons/bag.svg'
import Plus from '../assets/icons/add.svg'
import Minus from '../assets/icons/septagon.svg'
import Close from '../assets/icons/close.svg'
import Promo from '../assets/icons/Food-Site.svg'

const {width,height}= Dimensions.get('screen')

const Cart = ({navigation}) => {
    const [cartedItems, setCartedItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        fetchProducts();
        lastPrice();
    }, [setCartedItems])
    
    const fetchProducts = async () => {
        try {
            const storedItems = await AsyncStorage.getItem('items')
            let itemsArray = storedItems ? JSON.parse(storedItems) : []
            setCartedItems(itemsArray)
            // console.log(itemsArray);
        }
        catch (error) {
            console.log(error)
        }
    } 
    const decrement = async (item) => {
        const decrementItems = await AsyncStorage.getItem('items')
        const decrementArray = decrementItems ? JSON.parse(decrementItems) : [];
        const decrementUpdate = decrementArray.find((data) => data.id == item.id)
        if (decrementUpdate.quantity !==1) {
            decrementUpdate.quantity = decrementUpdate.quantity - 1,
            decrementUpdate.finalPrice = (decrementUpdate.quantity * decrementUpdate.price).toFixed(2)
        } else {
            decrementUpdate.quantity = 1
            decrementUpdate.finalPrice = decrementUpdate.price
        }
        await AsyncStorage.setItem('items', JSON.stringify(decrementArray))
        await fetchProducts()
        await lastPrice()
    }
    const increment = async (item) => {
        const incrementItems = await AsyncStorage.getItem('items')
        const incrementArray = incrementItems ? JSON.parse(incrementItems) : []
        const incrementUpdate = incrementArray.find((data) => data.id == item.id)
        if (incrementUpdate) {
            incrementUpdate.quantity = incrementUpdate.quantity + 1
            incrementUpdate.finalPrice = (incrementUpdate.quantity * incrementUpdate.price)
        }
        await AsyncStorage.setItem('items', JSON.stringify(incrementArray))
        await fetchProducts()
        await lastPrice()
    }
    const lastPrice = async () => {
        let amount = 0;
        const storedItems = await AsyncStorage.getItem('items');
        const itemsArray = storedItems ? JSON.parse(storedItems) : [];
        itemsArray.map((item) => (
            amount += Number(item.finalPrice)
        ))
        let totalAmount = Number(amount.toFixed(2))
        setSubTotal(totalAmount)
        
        let updatedTotalAmount = Number(((itemsArray.length === 0 ? 0 :20.9 ) + totalAmount).toFixed(2))
        setTotalPrice(updatedTotalAmount)
    }
    const renderEmptyCart = () => (
        <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Please add something to your cart</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Main')} style={styles.menuButton}>
                <Text style={styles.checkoutText}>Go to menu</Text>
            </TouchableOpacity>
        </View>
    );
    const deleteItem = async (item) => {
        const storedItems = await AsyncStorage.getItem('items')
        const itemsArray = storedItems ? JSON.parse(storedItems) : []
        const afterDeletion = itemsArray.filter((data) => data.id !== item.id)
        await AsyncStorage.setItem('items', JSON.stringify(afterDeletion))
        await fetchProducts()
        await lastPrice()
    }
  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
              <TouchableOpacity onPress={()=>navigation.goBack()}><Leftarrow height={27} width={27} /></TouchableOpacity>
              <Text style={styles.headingText}>My Cart</Text>
              <TouchableOpacity><Bag  height={27} width={27} /></TouchableOpacity>
          </View>
          {cartedItems.length > 0 ? (
                <View style={{ height: 450, }}>
                    <FlatList
                        contentContainerStyle={styles.flatlistContainer}
                        data={cartedItems}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <View style={styles.imageContainer}>
                                    <Image source={item.image} style={styles.imagestyle} />
                                </View>
                                <View style={styles.rightContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.mainText}>{item.style}</Text>
                                        <Text style={styles.mainText}>{item.name}</Text>
                                        <Text style={styles.subText}>Size : {item.size}</Text>
                                        <View style={{ flexDirection: 'row', marginBottom: 15, }}>
                                            <Text style={{ color: '#FB975D', fontSize: 18, }}>$ </Text>
                                            <Text style={styles.mainText}>{item.finalPrice}</Text>
                                        </View>

                                    </View>
                                    <View style={styles.iconContainer}>
                                        <View style={styles.prodButtonContainer}>
                                            <TouchableOpacity style={styles.changeButton} onPress={() => decrement(item)}>
                                                <Minus width={20} height={20} />
                                            </TouchableOpacity>
                                            <Text style={styles.quantity}>{item.quantity}</Text>
                                            <TouchableOpacity style={styles.changeButton} onPress={() => increment(item)}>
                                                <Plus width={20} height={20} />
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item)}>
                                            <Close width={20} height={20} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            ) : renderEmptyCart()}
          <View style={styles.bottomContainer}>
              <View style={styles.top}>
                  <Text style={styles.promoText}>Promo/Student code or Vouchers</Text>
                  <TouchableOpacity style={styles.promoImage}>
                      <Promo height={20} width={20}  />
                  </TouchableOpacity>
              </View>
              <View style={styles.middle}>
                  <View style={styles.totalText}>
                      <Text style={styles.subTotalText}>Sub Total</Text>
                      <Text style={styles.dollarText}>$ {subTotal}</Text>
                  </View>
                  <View style={styles.totalText}>
                      <Text style={styles.subTotalText}>Shipping</Text>
                      <Text style={styles.dollarText}>$ 20.9</Text>
                  </View>
              </View>
              <View style={styles.checkoutContainer}>
                  <View style={styles.totalContainer}>
                      <Text style={styles.subTotalText}>Total</Text>
                      <Text style={styles.dollarText}>$ {totalPrice}</Text>
                  </View>
                  <TouchableOpacity onPress={()=> navigation.navigate('Payment')} style={styles.checkoutButton}>
                      <Text style={styles.checkoutText}>Checkout</Text>
                  </TouchableOpacity>
              </View>
          </View>
          
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        width,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headingText: {
        fontSize: 18,
        fontFamily: 'Gorditas-Bold',
        color: '#000'
    },
    flatlistContainer: {
        width: width - 40,
        minHeight: width,
        paddingVertical: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    imageContainer: {
        height: width / 2.2,
        flex:0.65, 
    },
    imagestyle: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        
    },
    rightContainer: {
        flex: 1,
        marginLeft: 25,
    },
    textContainer: {},
    mainText: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Gorditas-Regular',
        marginBottom: 14,
    },
    
    subText: {
        fontSize: 12,
        marginBottom: 14,
        fontFamily: 'Gorditas-Regular',
        color: '#A6A6A6',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    prodBottomContainer:{
        flexDirection: 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        
    },
       prodButtonContainer:{
        flexDirection: 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        width: 90,
    },
       changeButton:{},
       quantity :{
        color : '#000',
        fontSize: 20,
        fontWeight: '600'
    },
       deleteButton:{},
       checkoutContainer:{
        paddingVertical : 20,
        width: '100%'

    },
    bottomContainer: {},
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    promoText: {
        fontSize: 14,
        fontFamily: 'Gorditas-Bold',
        color: '#000',
    },
    promoImage: {},
    middle: {
        borderBottomWidth: 1.5,
        borderStyle: 'dashed',
        borderBottomColor: '#A6A6A6',
        marginTop: 20,
    },
    totalText: {
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subTotalText: {
        color: '#A6A6A6',
        fontSize: 14,
        fontFamily: 'Gorditas-Regular',
    },
    dollarText: {
        fontSize: 20,
        fontFamily: 'Gorditas-Regular',
        color: '#000',
    },
    checkoutContainer: {
        marginTop: 30,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    checkoutButton: {
        width: width - 40,
        height: width / 7,
        borderRadius: 12,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Gorditas-Regular',
    },
    emptyCartContainer: {
        minHeight: 300,
        justifyContent: 'center',
        alignItems : 'center',
    },
    emptyCartText: {
        fontSize: 18,
        color: '#FB975D', 
        fontFamily: 'Gorditas-Bold',
    },
    menuButton: {
        width: width / 3,
        height: width / 9,
        borderRadius: 12,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
})