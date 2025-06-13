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
  variant?: "primary" | "danger";
  disabled?: boolean;
}

export default function GradientOutlineButton({
  title,
  onPress,
  style,
  size = "default",
  variant = "primary",
  disabled  = false
}: Props) {
  const isSmall = size === "small";

  const gradientColors: [string, string] =
    variant === "danger" ? [ "#930000", "#FF2323"] : ["#220593", "#26C2FF"];
  const color = variant === "danger" ? "#930000" : "#220593";

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={!disabled ? onPress : undefined} disabled={disabled}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 1.3, y: 0 }}
        style={[styles.buttonGradient, isSmall && styles.buttonGradientSmall]}
      >
        <View
          style={[styles.innerWrapper, isSmall && styles.innerWrapperSmall]}
        >
          <Text style={[styles.buttonText, isSmall && styles.buttonTextSmall, { color }]}>
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
