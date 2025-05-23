import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    GestureResponderEvent,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: "default" | "small";
}

export default function GradientOutlineButton({
  title,
  onPress,
  style,
  size = "default", // default value
}: Props) {
  const isSmall = size === "small";

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <LinearGradient
        colors={["#220593", "#26C2FF"]}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 1.3, y: 0 }}
        style={[styles.buttonGradient, isSmall && styles.buttonGradientSmall]}
      >
        <View style={[styles.innerWrapper, isSmall && styles.innerWrapperSmall]}>
          <Text style={[styles.buttonText, isSmall && styles.buttonTextSmall]}>
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  },

  buttonGradient: {
    width: "100%",
    borderRadius: 40,
    padding: 2,
  },

  buttonGradientSmall: {
    padding: 1.5,
  },

  innerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 12,
    alignItems: "center",
  },

  innerWrapperSmall: {
    padding: 10,
  },

  buttonText: {
    fontSize: 16,
    fontFamily: "Poppins-Semibold",
    color: "#220593",
    textAlign: "center",
  },

  buttonTextSmall: {
    fontSize: 12,
  },
});
