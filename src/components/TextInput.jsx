import { StyleSheet, View, TextInput as TextInputNative } from "react-native";
import React from "react";
import Text from "./Text";
import theme from "../theme";

const TextInput = ({
  value,
  onChangeText,
  placeholder,
  errorMessage,
  ...restProps
}) => {
  return (
    <View style={styles.inputContainer}>
      {value && <Text style={styles.label}>{placeholder}</Text>}
      <TextInputNative
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.input, errorMessage && styles.inputError]}
        {...restProps}
      />
      {errorMessage && (
        <Text style={{ color: theme.colors.danger }}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    gap: 4,
  },
  label: {
    color: theme.colors.textMuted,
    position: "absolute",
    top: -8,
    left: 8,
    zIndex: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: theme.fontSizes.heading,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: theme.colors.danger,
  },
});
