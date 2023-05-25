import { useRef } from 'react'
import Animated from 'react-native-reanimated'
import { Dimensions, StyleSheet, View } from 'react-native'

import { images } from '@utils/images'

const { width, height } = Dimensions.get('screen')

export function Home() {

  const scrollAnimation = useRef(new Animated.Value(0)).current

  return (
      <View style={styles.container}>
        <Animated.FlatList
          horizontal
          data={images}
          bounces={false}
          decelerationRate={0}
          snapToInterval={width}
          snapToAlignment='start'
          scrollEventThrottle={16}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollAnimation }}}], { useNativeDriver: true })}
          renderItem={({ item, index }) => {

            const inputRange = [width * (index - 1), width * index, width * (index + 1)]
            const outputRange = [-width * 0.2, 0, width * 0.2]

            return (
              <View style={styles.carouselItem}>
                <Animated.Image
                  source={item.image}
                  style={[
                    styles.carouselImage, { 
                      transform: [{ translateX: scrollAnimation.interpolate({ inputRange, outputRange }) }] 
                    }
                  ]}
                />
              </View>
            )
          }}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute"
  },
  carouselItem: {
    width,
    height,
    overflow: 'hidden',
    position: 'relative', 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  carouselImage: {
    width, 
    height, 
    resizeMode: 'cover',
  }
})