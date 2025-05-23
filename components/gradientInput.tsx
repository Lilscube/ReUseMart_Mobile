import { LinearGradient } from "expo-linear-gradient";
import { type LucideIcon } from 'lucide-react-native';
import React from "react";
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from "react-native";

interface Props extends TextInputProps {
  icon?: LucideIcon;         
  containerStyle?: ViewStyle;
}

export default function GradientInput({
  icon: Icon,
  containerStyle,
  ...textInputProps
}: Props) {
  return (
    <LinearGradient
      colors={["#26C2FF", "#220593"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradientBorder, containerStyle]}
    >
      <View style={styles.innerWrapper}>
        {Icon && (
          <Icon size={20} color="#888" style={styles.icon} />
        )}
        <TextInput
          style={[styles.input, Icon && { paddingLeft: 12 }]}
          placeholderTextColor="#999"
          {...textInputProps}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 40,
    padding: 2,
    marginBottom: 16,
  },

  innerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 40,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: "#000",
    fontFamily: "Poppins-Regular",
  },

  icon: {
    marginRight: 0,
  },
});
