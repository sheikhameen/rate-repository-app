import { Pressable, StyleSheet } from "react-native";
import React from "react";
import Text from "./Text";
import theme from "../theme";

const Button = ({ onPress, children, variant }) => {
  let backgroundColor = theme.colors.primary;
  if (variant === "destructive") backgroundColor = theme.colors.danger;

  const pressableStyles = [styles.pressable, { backgroundColor }];

  return (
    <Pressable style={pressableStyles} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  text: {
    color: "#fff",
    fontSize: theme.fontSizes.heading,
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
  },
});
