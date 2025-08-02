import { useEffect, useRef } from 'react';
import {
  Animated,
  // useAnimatedValue,
  View,
  Text,
  StyleSheet,
} from 'react-native';

type HoverProps = {
  show: boolean,
  text: string,
}

export default function Hover (props: HoverProps) {
  const { show, text } = props;
  
  const animatedValue = useRef(new Animated.Value(0)).current;
  const hoverContainerHeight = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    const toValue = show ? 100 : 0;

    Animated.timing(animatedValue, {
      toValue,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [show, animatedValue]);

  return (
    <View style={[
      styles.fullscreenContainer,
      show 
        ? styles.displayFlex
        : styles.displayNone
      ]}>
      <Animated.View style={{
        ...styles.hoverContainer,
        height: hoverContainerHeight,
      }}>
        <View style={styles.hoverInnerContainer}>
          <View>
            <Text style={styles.hoverTitle}>{text}</Text>
          </View>
          <Text style={styles.hoverCaption}>System information</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  displayNone: {
    display: 'none',
  },
  displayFlex: {
    display: 'flex',
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hoverContainer: {
    backgroundColor: '#02c820',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  hoverInnerContainer: {
    backgroundColor: '#003507',
    padding: 16,
    borderWidth: 8,
    borderColor: '#f9c314',
    width: '80%',
  },
  hoverTitle: {
    color: '#02c820',
    fontSize: 24,
  },
  hoverCaption: {
    color: 'white',
    fontSize: 16,
  }
})
