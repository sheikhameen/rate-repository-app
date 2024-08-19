import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useFormik } from "formik";

const initialValues = {
  username: "",
  password: "",
};

const SignIn = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      <Pressable style={styles.submit} onPress={formik.handleSubmit}>
        <Text style={styles.submitText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    gap: 16,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: theme.fontSizes.heading,
    borderRadius: 4,
    borderColor: theme.colors.border,
  },
  submit: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
  },

  submitText: {
    color: "#fff",
    fontSize: theme.fontSizes.heading,
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
  },
});

export default SignIn;
