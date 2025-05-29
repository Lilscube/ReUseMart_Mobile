import { LinearGradient } from "expo-linear-gradient";
import { Eye, EyeOff, type LucideIcon } from "lucide-react-native";
import React, { useState } from "react";
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";

interface Props extends TextInputProps {
  icon?: LucideIcon;
  containerStyle?: ViewStyle;
  onChangeText:(text:string)=>void
}

export default function GradientInput({
  icon: Icon,
  containerStyle,
  onChangeText,
  secureTextEntry,
  ...textInputProps
}: Props) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const showToggle = typeof secureTextEntry !== "undefined";

  return (
    <LinearGradient
      colors={["#26C2FF", "#220593"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradientBorder, containerStyle]}
    >
      <View style={styles.innerWrapper}>
        {Icon && <Icon size={20} color="#888" style={styles.icon} />}
        <TextInput
          style={[
            styles.input,
            (Icon || showToggle) && { paddingLeft: 12, paddingRight: 12 },
          ]}
          placeholderTextColor="#999"
          secureTextEntry={showToggle && !isPasswordVisible}
          onChangeText={onChangeText}
          {...textInputProps}
        />
        {showToggle && (
          <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? (
              <EyeOff size={20} color="#888" />
            ) : (
              <Eye size={20} color="#888" />
            )}
          </TouchableOpacity>
        )}
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
