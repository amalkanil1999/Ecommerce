import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';

const screenWidth = Dimensions.get('window').width;

export default function Carousel() {
  const flatlistRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === CarouselData.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
      } else {
        flatlistRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, 2000);
    return () => clearInterval(interval)
  })
  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  })

  const CarouselData = [
    {
      id: 1,
      image: require('../../assets/images/Red_skirt.png'),
    },
    {
      id: 2,
      image: require('../../assets/images/Mainimage.png'),
      top: 'Fastacy',
      sub1: 'Classy',
      sub2: 'Fashion',
      icon: require('../../assets/icons/Polygon.png'),
    },
    {
      id: 3,
      image: require('../../assets/images/straight_image.png'),
    },
  ];
  const renderItems = ({item, index}) => {
    return (
      <View style={styles.mainContainer} key={index}>
        {item.top && (<Text style={styles.topText}>{item.top}</Text>)}
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.titleImage} resizeMode='contain' />
        </View>
        {item.sub1 && (<Text style={styles.sub1Text}>{item.sub1}</Text>)}
        {item.icon && (
          <View style={styles.iconContainer}>
            <Text style={styles.sub2Text}>{item.sub2}</Text>
            <Image style={styles.iconImage} source={item.icon} />
          </View>
        )}
        
      </View>
    );
  };
  const handleScroll = event => {
    const scrollPosition =
      Math.round(event.nativeEvent.contentOffset.x * 10) / 10;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };
  const renderDotIndicators = () => {
    return CarouselData.map((dot, index) => {
      if (activeIndex === index) {
        return <View key={index} style={styles.dotIndicatorsactive}></View>;
      } else {
        return <View key={index} style={styles.dotIndicators}></View>;
      }
    });
  };

  return (
    <View >
      <FlatList
        data={CarouselData}
        ref={flatlistRef}
        renderItem={renderItems}
        keyExtractor={item => item.id}
        horizontal
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScroll={handleScroll}
      />
      <View style={styles.dotContainer}>{renderDotIndicators()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: screenWidth,
    flex: 1,
    position: 'relative',
    paddingVertical: 30,
    paddingLeft: 8,
  },
  imageContainer: {
    height: 500,
    alignItems: 'center',
  },
  topText: {
    fontSize: 37,
    color: '#000',
    fontWeight: '600',
    position: 'absolute',
    transform: [{ rotate: '-13deg' }],
    top: 30,
    left: 20,
    
  },
  sub1Text: {
    fontSize: 37,
    color: '#000',
    fontWeight: '600',
    position: 'absolute',
    bottom: 132,
    left: 210,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 84,
    right: 60,
  },
  sub2Text: {
    fontSize: 37,
    color: '#000',
    fontWeight: '600'
  },
  titleImage: {
    width: '90%',
    height: '100%',
  },
  iconImage: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
  dotIndicators: {
    height: 8,
    width: 8,
    backgroundColor: '#A6A6A6',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  dotIndicatorsactive: {
    height: 8,
    width: 8,
    backgroundColor: '#000',
    borderRadius: 4,
    marginHorizontal: 3,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
