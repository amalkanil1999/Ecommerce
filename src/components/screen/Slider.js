import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Like from '../../assets/icons/like.svg';

const {width, height} = Dimensions.get('screen');

export default function Slider({navigation}) {
  const [selected, setSelected] = useState(1);
  const [data, setData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const flatlistRef = useRef();

  useEffect(() => {
    const initialData = [
      {
        id: 1,
        style: 'Casual',
        name: 'Blue Dress',
        image: require('../../assets/images/Beach_dress.png'),
        price: 178.99,
        category: 'women',
      },
      {
        id: 2,
        style: 'Regular',
        name: 'Eye Wear',
        image: require('../../assets/images/Full_skirt.png'),
        price: 102.13,
        category: 'eyeWear',
      },
      {
        id: 3,
        style: 'Regular',
        name: 'Green Kurtha',
        image: require('../../assets/images/Greenish_blue.jpg'),
        price: 300.74,
        category: 'women',
      },
      {
        id: 4,
        style: 'Regular',
        name: 'Pink Tshirt',
        image: require('../../assets/images/Pink_dress.png'),
        price: 58.98,
        category: 'women',
      },
      {
        id: 5,
        style: 'Regular',
        name: 'Red Dress',
        image: require('../../assets/images/Red_skirt.png'),
        price: 85.25,
        category: 'women',
      },
      {
        id: 6,
        style: 'Casual',
        name: 'White Shirt',
        image: require('../../assets/images/straight_image.png'),
        price: 254.45,
        category: 'winter',
      },
      {
        id: 7,
        style: 'Regular',
        name: 'White Dress',
        image: require('../../assets/images/White_shirt.png'),
        price: 25.75,
        category: 'women',
      },
      {
        id: 8,
        style: 'Casual',
        name: 'White Kurtha',
        image: require('../../assets/images/White_skirt.png'),
        price: 251.85,
        category: 'winter',
      },
    ];
    setData(initialData);
  }, []);

  const filterData = () => {
    let filteredData = data;
    if (selected !== 1) {
      const category = getCategoryFromSelection(selected);
      filteredData = data.filter(item => item.category === category);
    }
    return filteredData;
  };

  const getCategoryFromSelection = selection => {
    switch (selection) {
      case 2:
        return 'winter';
      case 3:
        return 'women';
      case 4:
        return 'eyeWear';
      default:
        return '';
    }
  };
  const renderItems = ({ item, index }) => {
   
    return (
      <TouchableOpacity style={styles.touchableContainer} onPress={()=>navigation.navigate('Page',{item})}>
        <Animated.View style={styles.imageContainer}>
          <Image source={item.image} style={styles.sliderImage} />
          <Like width={25} height={25} style={styles.like} />
        </Animated.View>
        <Text style={styles.mainText}>
          {item.style} {item.name}
        </Text>
        <Text style={styles.mainText}>
          ${item.price}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{width: width}}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setSelected(1)}
          style={
            selected == 1 ? styles.selectedButtonStyle : styles.buttonStyle
          }>
          <Text
            style={
              selected == 1 ? styles.selectedButtontext : styles.buttonText
            }>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected(2)}
          style={
            selected == 2 ? styles.selectedButtonStyle : styles.buttonStyle
          }>
          <Text
            style={
              selected == 2 ? styles.selectedButtontext : styles.buttonText
            }>
            Winter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected(3)}
          style={
            selected == 3 ? styles.selectedButtonStyle : styles.buttonStyle
          }>
          <Text
            style={
              selected == 3 ? styles.selectedButtontext : styles.buttonText
            }>
            Women
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected(4)}
          style={
            selected == 4 ? styles.selectedButtonStyle : styles.buttonStyle
          }>
          <Text
            style={
              selected == 4 ? styles.selectedButtontext : styles.buttonText
            }>
            Eyewear
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={filterData()}
        horizontal
        pagingEnabled={true}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItems}
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.popularContainer}>
            <Text style={{fontSize: 18, fontFamily: 'Gorditas-Bold',color: '#000'}}>
              Most Popular
            </Text>
            <TouchableOpacity>
              <Text style={{fontSize: 14, fontFamily: 'Gorditas-Bold',color: '#000'}}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
      <View style={{height: 310, paddingBottom: 45}}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle2}
        data={data}
        horizontal={false}
          decelerationRate="fast"
          snapToAlignment="center"
          numColumns={2}
          pagingEnabled={true}
          showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.touchableContainer2} onPress={()=>navigation.navigate("Page",{item})}>
            <Animated.View style={styles.imageContainer2}>
              <Image resizeMode='cover' source={item.image} style={styles.sliderImage2} />
              <Like width={25} height={25} style={styles.like2} />
            </Animated.View>
            <Text style={styles.mainText2}>
              {item.style} {item.name}
            </Text>
            <Text style={styles.mainText2}>
              ${item.price}
            </Text>
          </TouchableOpacity>
        )}
      />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 30,
    flexDirection: 'row',
  },
  buttonStyle: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selectedButtonStyle: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Gorditas-Bold',
  },
  selectedButtontext: {
    fontSize: 12,
    color: '#fff',
    fontFamily: "Gorditas-Bold",
  },
  contentContainerStyle: {
    alignItems: 'center',
    paddingTop: 15,
  },
  touchableContainer: {
    width: width / 1.8,
    paddingHorizontal: 15,
  },
  imageContainer: {
    width: '100%',
    height: width / 1.8,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'relative',
  },
  like: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  mainText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Gorditas-Regular',
    textAlign: 'center',
    marginTop: 5,
  },
  popularContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  touchableContainer2: {
    width: width / 2,
    paddingHorizontal: 15,
    marginVertical: 20,
    alignItems: 'flex-start',
  },
  imageContainer2: {
    width: '100%',
    height: width / 2.1,
  },
  sliderImage2: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'relative',
  },
  like2: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  mainText2: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Gorditas-Regular',
    textAlign: 'center',
    marginTop: 5,
  },
  contentContainerStyle2: {
    width: width,
  },
});
