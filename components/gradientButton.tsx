import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    GestureResponderEvent,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
}

export default function GradientButton({ title, onPress, style }: Props) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <LinearGradient
        colors={["#220593", "#26C2FF"]}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 1.3, y: 0 }}
        style={styles.buttonGradient}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 40,
    overflow: "hidden",
    width: "100%",
  },

  buttonGradient: {
    padding: 12,
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#5de6ff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 30,
  },

  buttonText: {
    fontSize: 16,
    fontFamily: "Poppins-Semibold",
    color: "#fff",
    textAlign: "center",
  },
});
