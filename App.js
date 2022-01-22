import React, {useEffect, useState} from 'react';
import {PixelRatio, View, Dimensions, Image, StyleSheet} from 'react-native';
import {gyroscope} from 'react-native-sensors';
const window = Dimensions.get('window');

const deviceWidth = window.width;
const deviceHeight = window.height;

const imageWidth = 8 * deviceWidth;
const imageHeight = deviceHeight;

const App = () => {
  const [axisY, setAxisY] = useState(0);
  const image = `https://placeimg.com/${PixelRatio.getPixelSizeForLayoutSize(
    imageWidth,
  )}/${PixelRatio.getPixelSizeForLayoutSize(imageHeight)}/any`;

  useEffect(() => {
    let subscription = gyroscope.subscribe(({y}) => setAxisY(y));

    return () => {
      subscription.unsubscribe();
      subscription = null;
    };
  });
  const positionOnScreenX = -imageWidth / 2;
  const movementX = (-axisY / 1000) * imageWidth;
  return (
    <View>
      <Image
        source={{uri: image}}
        style={styles.image}
        translateX={positionOnScreenX + movementX}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: imageHeight,
    width: imageWidth,
  },
});

export default App;
