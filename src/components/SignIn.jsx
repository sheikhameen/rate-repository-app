import { Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useFormik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import TextInput from "./TextInput";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        placeholder="Username"
        errorMessage={formik.touched.username && formik.errors.username}
      />

      <TextInput
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        placeholder="Password"
        errorMessage={formik.touched.password && formik.errors.password}
      />

      <Pressable style={styles.submit} onPress={formik.handleSubmit}>
        <Text style={styles.submitText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    gap: 16,
  },
  inputContainer: {
    display: "flex",
    gap: 4,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: theme.fontSizes.heading,
    borderRadius: 4,
    borderColor: theme.colors.border,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: theme.colors.danger,
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
