import { View } from "react-native";

export default function Divider({ color = "#ccc", margin = 16 }) {
  return (
    <View
      style={{
        height: 0.5,
        backgroundColor: "#D9D9D9",
      }}
    />
  );
}
