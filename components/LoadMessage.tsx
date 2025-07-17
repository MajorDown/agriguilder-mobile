import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import AppText from "./texts/AppText";

const LoadMessage = () => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000, // 1 tour en 1s
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });

  return (
    <View style={styles.container}>
      <AppText>Chargement des données en cours.</AppText>
      <AppText>Veuillez patienter...</AppText>
      <Animated.Image
        source={require('@/assets/images/icons/loadspinner.png')}
        style={{
          width: 50,
          height: 50,
          transform: [{ rotate: spin }],
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default LoadMessage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  }
});
